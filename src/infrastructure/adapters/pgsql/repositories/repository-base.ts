import { FindManyOptions, FindOptionsWhere, ILike, ObjectLiteral, Repository, DeepPartial } from 'typeorm'
import { EntityTarget } from 'typeorm/common/EntityTarget'
import { EntityManager } from 'typeorm/entity-manager/EntityManager'
import { QueryRunner } from 'typeorm/query-runner/QueryRunner'
import { Logger } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'

/**
 * Utility function to compute search criteria for use in queries.
 */
function getSearches(searchFields: string[], props: Record<string, any>): Record<string, any> | undefined {
  if (!searchFields) return undefined

  // Validate and prepare search criteria
  return searchFields.reduce(
    (acc, field) => {
      const formattedField = field.includes('.') ? `"${field}"` : field

      if (props?.search) {
        // Handle UUID strings with strict equality
        if (isUuid(props.search)) {
          acc[formattedField] = props.search
        }
        // Handle text fields with partial match
        else {
          acc[formattedField] = ILike(`%${props.search}%`)
        }
      }

      return acc
    },
    {} as Record<string, any>,
  )
}

/**
 * Builds filter conditions for the query dynamically based on exact matches or partial match rules.
 * @param filters - An object where keys are field names and values are filter values.
 * @returns A `FindOptionsWhere` object to inject into the `where` clause.
 */
function getWhereByValue(filters: Record<string, any> = {}): Record<string, any> | undefined {
  if (!filters || Object.keys(filters).length === 0) return undefined

  // Build conditions dynamically
  return Object.entries(filters).reduce(
    (acc, [field, value]) => {
      if (value === undefined || value === null) {
        return acc // Skip undefined or null values
      }

      const formattedField = field.includes('.') ? `"${field}"` : field

      // Use exact match for ID (or UUID fields)
      if (field === 'id' && isUuid(value)) {
        acc[formattedField] = value
      }
      // Use strict equality for UUIDs
      else if (typeof value === 'string' && isUuid(value)) {
        acc[formattedField] = value
      }
      // Use ILIKE for text-based fields
      else if (typeof value === 'string') {
        acc[formattedField] = ILike(`%${value}%`)
      }
      // Use exact match for other data types
      else {
        acc[formattedField] = value
      }

      return acc
    },
    {} as Record<string, any>,
  )
}

// Helper function to validate if a string is a UUID
function isUuid(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(value)
}

/**
 * Base repository class that provides common, reusable repository operations.
 */
export abstract class RepositoryBase<T extends ObjectLiteral> extends Repository<T> {
  protected readonly logger: Logger

  protected constructor(target: EntityTarget<T>, manager: EntityManager, queryRunner?: QueryRunner) {
    super(target, manager, queryRunner)
    this.logger = new Logger(this.constructor.name)
  }

  /**
   * Save or update an entity object with complete handling of relationships.
   */
  async saveObject(input: DeepPartial<T>): Promise<void> {
    try {
      const repository = this.manager.getRepository(this.target)
      const processedInput = this.prepareRelationships(input, repository)
      const entityData = repository.create(processedInput) // Convert to proper entity
      await repository.save(entityData) // Save the entity with cascading relationships
    } catch (e: any) {
      this.logger.error(`Error saving object: ${e.message}`, e.stack)
      throw e
    }
  }

  async saveObjectWithRelations(input: DeepPartial<T>): Promise<void> {
    const queryRunner = this.manager.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const repository = queryRunner.manager.getRepository(this.target)
      const entity = repository.create(input)

      await this.persistEntityRecursively(entity, repository, queryRunner.manager)

      await queryRunner.commitTransaction()
    } catch (e: any) {
      this.logger.error(`Transaction failed: ${e.message}`, e.stack)
      await queryRunner.rollbackTransaction()
      throw e
    } finally {
      await queryRunner.release()
    }
  }

  private async persistEntityRecursively(entity: any, repository: Repository<any>, manager: EntityManager, visited = new WeakSet()): Promise<any> {
    if (!entity || visited.has(entity)) return entity

    visited.add(entity)

    const metadata = repository.metadata

    for (const relation of metadata.relations) {
      const value = entity[relation.propertyName]
      const relatedRepo = manager.getRepository(relation.type)

      if (!value) continue

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          value[i] = await this.persistEntityRecursively(value[i], relatedRepo, manager, visited)
          if (relation.isOneToMany) {
            const inverse = relatedRepo.metadata.relations.find((r) => r.isManyToOne && r.inverseEntityMetadata.target === metadata.target)
            if (inverse) value[i][inverse.propertyName] = entity
          }
        }
      } else {
        if (!manager.queryRunner || manager.queryRunner.isReleased) {
          throw new Error('QueryRunner is unavailable during recursive persistence')
        }
        entity[relation.propertyName] = await this.persistEntityRecursively(value, relatedRepo, manager, visited)
      }
    }

    if (!manager.queryRunner || manager.queryRunner.isReleased) {
      throw new Error('QueryRunner is unavailable during final save')
    }

    return await manager.getRepository(metadata.target).save(entity)
  }

  /**
   * Recursively map and prepare nested relationships within the input data.
   */
  private prepareRelationships(input: any, repository: Repository<any>, visited = new WeakSet()): any {
    if (!input || typeof input !== 'object' || visited.has(input)) {
      return input
    }

    visited.add(input)

    const relations = repository.metadata.relations

    for (const relation of relations) {
      const key = relation.propertyName
      const value = input[key]

      if (!value) continue

      const relatedRepository = this.manager.getRepository(relation.type)

      if (Array.isArray(value)) {
        input[key] = value.map((item) => {
          const prepared = this.prepareRelationships(item, relatedRepository, visited)
          const entity = relatedRepository.create(prepared)

          // Força o TypeORM a tratar como novo, mesmo com ID
          Object.defineProperty(entity, '__isNew__', { value: true, enumerable: false })

          return entity
        })
      } else if (typeof value === 'object') {
        const prepared = this.prepareRelationships(value, relatedRepository, visited)
        const entity = relatedRepository.create(prepared)

        Object.defineProperty(entity, '__isNew__', { value: true, enumerable: false })

        input[key] = entity
      }
    }

    return input
  }

  /**
   * Retrieve relation metadata for a specified property name.
   */
  private getRelationMeta(relations: any[], propertyName: string): any | null {
    return relations.find((relation) => relation.propertyName === propertyName) || null
  }

  /**
   * Find a single entity matching the given criteria.
   */
  async findOneByCriteria(props: Criteria.ById, relations?: string[]): Promise<Partial<T> | null> {
    try {
      const filters: FindOptionsWhere<T | any> = {
        where: {
          id: props?.id,
          enable: true,
        },
        relations,
        // order: { description: 'ASC' },
        withDeleted: false,
      }
      return await this.findOne(filters)
    } catch (e: any) {
      this.logger.error(`Error finding a single object by criteria: ${e.message}`, e.stack)
      throw e
    }
  }

  /**
   * Find all entities matching pagination and filter criteria.
   * Includes dynamic searching and filtering by fields.
   */
  async findAllByCriteria(
    props: Record<string, any>,
    order: Record<string, string> = { createdAt: 'ASC' },
    select: string[] = [],
    searchFields: string[] = [],
    relations: string[] = [],
    whereByValue: Record<string, any> = {},
  ): Promise<{
    count: number
    limit: number
    offset: number
    data: Partial<T>[]
  }> {
    try {
      const searches = getSearches(searchFields, props)
      const filterConditions = getWhereByValue(whereByValue)
      const combinedWhere = {
        ...(searches || {}), // AND or OR-driven `searchFields`
        ...(filterConditions || {}), // AND-driven filter conditions
      }

      const filters: FindManyOptions<T | any> = {
        select,
        where: Object.keys(combinedWhere).length > 0 ? combinedWhere : {},
        relations,
        order,
        withDeleted: props.isActive !== undefined ? !props.isActive : undefined,
        take: props.limit,
        skip: props.offset,
      }

      const [data, count] = await this.manager.getRepository(this.target).findAndCount(filters)

      return {
        count,
        limit: props.limit,
        offset: props.offset,
        data,
      }
    } catch (e: any) {
      this.logger.error(`Error finding all objects by criteria: ${e.message}`, e.stack)
      throw e
    }
  }

  /**
   * Find entities to populate a dropdown or select box.
   */
  async findForSelectByCriteria(props: Criteria.FindBy, order: Record<string, string> = { createdAt: 'ASC' }, select: string[] = [], searchFields: string[] = []): Promise<T[]> {
    try {
      const searches = getSearches(searchFields, props)

      const filters: FindManyOptions<T | any> = {
        select,
        where: searches || {},
        order,
        withDeleted: props.isActive !== undefined ? !props.isActive : undefined,
      }

      const repository: Repository<T> = this.manager.getRepository(this.target)
      return await repository.find(filters)
    } catch (e: any) {
      this.logger.error(`Error finding for select by criteria: ${e.message}`, e.stack)
      throw e
    }
  }

  /**
   * Update an entity object by merging new input values.
   */
  async updateObject(input: Partial<T>, props: Criteria.ById, relations?: string[]): Promise<void> {
    try {
      const repository: Repository<T> = this.manager.getRepository(this.target)

      const existingEntity = await repository.findOne({
        where: { id: props.id as any },
        relations,
      })

      if (!existingEntity) throw new Error('Entity not found')

      Object.assign(existingEntity, input) // Merge the input into the existing entity
      await repository.save(existingEntity) // Save the updated entity
    } catch (e: any) {
      this.logger.error(`Error updating object: ${e.message}`, e.stack)
      throw e
    }
  }

  /**
   * Perform a patch update by applying partial changes and persisting them.
   */
  async patchObject(input: Partial<T>, props: Criteria.ById, EntityClass: new (...args: any[]) => T, relations?: string[]): Promise<void> {
    try {
      const repository: Repository<T> = this.manager.getRepository(this.target)
      const where: FindOptionsWhere<T | any> = { id: props.id, enable: true }

      const existingEntity = await repository.findOne({
        where,
        relations,
      })

      if (!existingEntity) throw new Error('Entity not found')

      Object.assign(existingEntity, input)

      if (!EntityClass) {
        throw new Error('EntityClass is required for instantiation')
      }
      Object.assign(existingEntity, input)
      await repository.save(existingEntity)
    } catch (e: any) {
      this.logger.error(`Error patching object: ${e.message}`, e.stack)
      throw e
    }
  }

  /**
   * Creates multiple new child entities associated with a given parent.
   * Rolls back the operation if any child creation or validation fails.
   *
   * @param parentId - The ID of the parent entity.
   * @param childrenInputs - Array of input data for creating new child entities.
   * @param ChildEntityClass - Constructor to create and validate child entities.
   * @returns A promise that resolves when all children are successfully created.
   */ /*
  async createChildrenForParent<Child>(
    parentId: string,
    childrenInputs: Partial<Child>[],
    ChildEntityClass: new (...args: any[]) => Child
  ): Promise<void> {
    if (!childrenInputs.length) {
      throw new Error('Children inputs must not be empty.');
    }

    try {
      await this.manager.transaction(async (transactionalEntityManager) => {
        const repository = transactionalEntityManager.getRepository(ChildEntityClass);

        for (let childInput of childrenInputs) {
          try {
            // Validate the input and create the child
            childInput = new ChildEntityClass(childInput, parentId);
            // Save the child

          } catch (createError: any) {
            throw new Error(
              `Failed to create child: ${JSON.stringify(childInput)}. Error: ${createError.message}`
            );
          }
        }
        await repository.save(childrenInputs);
      });
    } catch (error: any) {
      console.error('Transaction failed while creating children:', error.message);
      throw new Error('Failed to create children for the parent. Transaction rolled back.');
    }
  }*/

  /**
   * Updates multiple existing child entities for a given parent.
   * Rolls back the operation if any child update or validation fails.
   *
   * @param updateInputs - Array of criteria and data for updating child entities.
   * @param ChildEntityClass - Constructor to validate child entities.
   * @param relations - Optional relationships to include when fetching child entities.
   * @returns A promise that resolves when all children are successfully updated.
   */ /*
  async patchChildrenForParent<Child>(
    updateInputs: { criteria: Criteria.ByChildren; data: Partial<Child> }[],
    ChildEntityClass: new (...args: any[]) => Child,
    relations?: string[]
  ): Promise<void> {
    if (!updateInputs.length) {
      throw new Error('Update inputs must not be empty.');
    }

    try {
      await this.manager.transaction(async (transactionalEntityManager) => {
        const repository = transactionalEntityManager.getRepository(ChildEntityClass);

        for (const updateInput of updateInputs) {
          const { criteria, data } = updateInput;

          try {
            // Find the existing child by criteria
            const existingChild = await repository.findOne({
              where: {
                id: criteria.childrenId,
                parentId: criteria.parentId,
              },
              relations,
            });

            if (!existingChild) {
              throw new Error(
                `Child entity with ID (${criteria.childrenId}) and Parent ID (${criteria.parentId}) not found.`
              );
            }

            // Update the existing child with new data
            Object.assign(existingChild, data);
            const updatedChild = new ChildEntityClass(existingChild);

            // Save changes
            await repository.save(updatedChild);
          } catch (updateError) {
            throw new Error(
              `Failed to update child (ID: ${criteria.childrenId}, Parent ID: ${criteria.parentId}). Error: ${updateError.message}`
            );
          }
        }
      });
    } catch (error) {
      console.error('Transaction failed while updating children:', error.message);
      throw new Error('Failed to update children for the parent. Transaction rolled back.');
    }
  }*/

  /**
   * Soft delete an entity by ID.
   */
  async deleteObject(id: string): Promise<void> {
    try {
      const repository: Repository<T> = this.manager.getRepository(this.target)
      const filters: FindManyOptions<T> = { id, enable: true } as FindManyOptions<T>

      const entityExists = await repository.exist({
        where: { id, enable: true } as any,
      })

      if (!entityExists) throw new Error('Entity not found or already deleted')

      await repository.softDelete(id)
    } catch (e: any) {
      this.logger.error(`Error deleting object: ${e.message}`, e.stack)
      throw e
    }
  }

  /**
   * Throws an error indicating that the method is not implemented.
   *
   * @param operation - A transactional operation, which won't be executed in this stub.
   * @throws Error explicitly indicating the method is not implemented.
   */
  async transaction<T>(operation: (manager: EntityManager) => Promise<T>): Promise<T> {
    throw new Error('Transaction method not implemented.')
  }
}
