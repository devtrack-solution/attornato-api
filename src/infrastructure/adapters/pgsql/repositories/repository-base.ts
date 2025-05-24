import {
  FindManyOptions,
  FindOptionsWhere,
  ILike,
  ObjectLiteral,
  Repository,
  DeepPartial,
  FindOptionsOrder,
  Brackets
} from 'typeorm'
import { EntityTarget } from 'typeorm/common/EntityTarget'
import { EntityManager } from 'typeorm/entity-manager/EntityManager'
import { QueryRunner } from 'typeorm/query-runner/QueryRunner'
import { Logger, NotFoundException } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DateTime } from 'luxon'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'

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
      props: Criteria.Paginated,
      order: Record<string, string> = { createdAt: 'ASC' },
      select: string[] = [],
      searchFields: string[] = [],
      relations: string[] = [],
      filters: Record<string, any> = {},
      whereByValue: Record<string, any> = {}
  ): Promise<{
    count: number
    limit: number
    offset: number
    data: Partial<T>[]
  }> {
    try {
      const alias = 'entity'
      const repository = this.manager.getRepository(this.target)
      const queryBuilder = repository.createQueryBuilder(alias)

      // Adiciona joins
      for (const relation of relations) {
        queryBuilder.leftJoinAndSelect(`${alias}.${relation}`, relation)
      }

      // Converte valores string 'true'/'false' em booleanos reais
      const propsAny = props as Record<string, any>
      for (const key in propsAny) {
        if (propsAny[key] === 'true') propsAny[key] = true
        if (propsAny[key] === 'false') propsAny[key] = false
      }

      // Busca por texto
      if (props.search && searchFields.length) {
        queryBuilder.andWhere(
            new Brackets((qb) => {
              for (const field of searchFields) {
                qb.orWhere(`LOWER(${field}) LIKE LOWER(:search)`, { search: `%${props.search}%` })
              }
            })
        )
      }

      // Aplica filtros exatos
      for (const key in filters) {
        if (filters[key] !== undefined) {
          queryBuilder.andWhere(`${key} = :${key}`, { [key]: filters[key] })
        }
      }

      // Aplica filtros whereByValue
      for (const key in whereByValue) {
        if (whereByValue[key] !== undefined) {
          queryBuilder.andWhere(`${key} = :${key}`, { [key]: whereByValue[key] })
        }
      }

      // Filtro por enable se definido
      if (props.isActive !== undefined) {
        queryBuilder.andWhere(`${alias}.enable = :enable`, { enable: props.isActive })
      }

      // Select de campos
      if (select?.length) {
        queryBuilder.select(select.map((field) => `${alias}.${field}`))
      }

      // Ordenação
      for (const key in order) {
        queryBuilder.addOrderBy(`${alias}.${key}`, order[key].toUpperCase() as 'ASC' | 'DESC')
      }

      // Paginação
      queryBuilder.skip(props.offset ?? 0)
      queryBuilder.take(props.limit ?? 10)

      // Executa
      const [data, count] = await queryBuilder.getManyAndCount()

      return {
        count,
        limit: props.limit ?? 10,
        offset: props.offset ?? 0,
        data
      }
    } catch (e: any) {
      this.logger.error(`Error finding all objects by criteria: ${e.message}`, e.stack)
      throw e
    }
  }


  /**
   * Find entities to populate a dropdown or select box.
   */
  async findForSelectByCriteria(
      props: Criteria.FindBy,
      order: Record<string, string> = { createdAt: 'ASC' },
      select: string[] = [],
      searchFields: string[] = [],
      whereByValue: Record<string, any> = {}
  ): Promise<T[]> {
    try {
      const alias = 'entity'
      const repository = this.manager.getRepository(this.target)
      const queryBuilder = repository.createQueryBuilder(alias)

      // Adiciona SELECT personalizado, se necessário
      if (select.length > 0) {
        queryBuilder.select(select.map((field) => `${alias}.${field}`))
      }

      // JOINs para searchFields aninhados
      const joins = new Set<string>()
      for (const field of searchFields) {
        if (field.includes('.')) {
          const [relation] = field.split('.')
          joins.add(relation)
        }
      }
      joins.forEach((relation) => {
        queryBuilder.leftJoinAndSelect(`${alias}.${relation}`, relation)
      })

      // Filtro por texto (search)
      if (props.search && searchFields.length > 0) {
        queryBuilder.andWhere(
            new Brackets((qb) => {
              for (const field of searchFields) {
                qb.orWhere(`LOWER(${field}) LIKE LOWER(:search)`, { search: `%${props.search}%` })
              }
            })
        )
      }

      // Filtro adicional: whereByValue
      for (const key in whereByValue) {
        if (whereByValue[key] !== undefined) {
          queryBuilder.andWhere(`${key} = :${key}`, { [key]: whereByValue[key] })
        }
      }

      // Filtro por enable (ativo/desativado)
      if (props.isActive !== undefined) {
        queryBuilder.andWhere(`${alias}.enable = :enable`, { enable: props.isActive })
      }

      // Ordenação
      for (const [field, direction] of Object.entries(order)) {
        queryBuilder.addOrderBy(`${alias}.${field}`, direction.toUpperCase() as 'ASC' | 'DESC')
      }

      // Exibe resultados
      return await queryBuilder.getMany()
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
      const where: FindOptionsWhere<T | any> = { id: props.id }

      const existingEntity = await repository.findOne({
        where,
        relations,
        withDeleted: true,
      })

      if (!existingEntity) throw new NotFoundException('Entity not found')

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
   * Soft delete an entity by ID.
   */
  async deleteObject(id: string): Promise<void> {
    const config = new ConfigEnvironmentService()
    try {
      const repository: Repository<T> = this.manager.getRepository(this.target)
      const filters: FindManyOptions<T> = { id, enable: true } as FindManyOptions<T>

      const entityExists = await repository.exist({
        where: { id, enable: true } as any,
      })

      if (!entityExists) throw new Error('Entity not found or already deleted')

      await repository.update(id, {
        enable: false,
        updatedAt: DateTime.now().setZone(config.project.timeZone).toJSDate(),
      } as any)
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
