import { FindManyOptions, FindOptionsWhere, ILike, ObjectLiteral, Repository, DeepPartial, FindOptionsOrder, Brackets, SelectQueryBuilder } from 'typeorm'
import { EntityTarget } from 'typeorm/common/EntityTarget'
import { EntityManager } from 'typeorm/entity-manager/EntityManager'
import { QueryRunner } from 'typeorm/query-runner/QueryRunner'
import { Logger, NotFoundException } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DateTime } from 'luxon'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
import { AppConfig } from '@/domain/app-config.interface'
import { EntityHelper } from '@/core/infrastructure/adepters/helper-database/entity.helper'
import { normalizeSelectFields } from '@/core/infrastructure/adepters/helper-database/normalize-select-fields.helper'
import { QueryAliasHelper } from '@/core/infrastructure/adepters/helper-database/query-alias.helper'
import { DataBase } from '@/core/domain/types/database.type'
import { FilterQueryHelper } from '@/core/infrastructure/adepters/helper-database/filter-query.helper'
import { SearchQueryHelper } from '@/core/infrastructure/adepters/helper-database/search-query.helper'
import { RelationQueryHelper } from '@/core/infrastructure/adepters/helper-database/relation-query.helper'

/**
 * Base repository class that provides common, reusable repository operations.
 */
export abstract class RepositoryBase<T extends ObjectLiteral> extends Repository<T> {
  protected readonly logger: Logger
  private readonly entityName: string

  protected constructor(
    target: EntityTarget<T>,
    manager: EntityManager,
    private readonly config: AppConfig,
    queryRunner?: QueryRunner,
  ) {
    super(target, manager, queryRunner)
    const entityHelper = new EntityHelper()
    this.entityName = entityHelper.getEntityName(target)
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
  async findOneByCriteria(
    props: Criteria.ById,
    relations: string[] = [],
    order: Record<string, string> = { createdAt: 'ASC' },
    select: string[] = [],
    searchFields: string[] = [],
    filters: Record<string, any> = {},
  ): Promise<Partial<T> | null> {
    try {
      const filters: FindOptionsWhere<T | any> = {
        where: {
          id: props?.id,
          isActive: true,
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
   * Finds all objects by criteria.
   *
   * @param props - Pagination and base filters.
   * @param order - Object fields to sort by (default: createdAt ASC).
   * @param selectField
   * @param searchFields - Fields of root entity to apply search (LIKE).
   * @param relations - List of relation names to include (e.g., ['messages']).
   * @param filters - Object containing field/value pairs to filter by. Supports nested keys (e.g., 'messages.id').
   * @returns A paginated list of results with count, limit, offset, and data.
   */
  async findAllByCriteria(
    props: Criteria.Paginated,
    order: Record<string, string> = { createdAt: 'ASC' },
    selectField: string[] = [],
    searchFields: string[] = [],
    relations: string[] = [],
    filters: DataBase.Filters[] = [],
  ): Promise<{
    count: number
    limit: number
    offset: number
    data: Partial<T>[]
  }> {
    const qb = this.createQueryBuilder(this.entityName)
    const rootAlias = qb.alias
    const aliasHelper = new QueryAliasHelper(rootAlias)
    const filterHelper = new FilterQueryHelper(aliasHelper)
    const searchHelper = new SearchQueryHelper(aliasHelper)
    const relationHelper = new RelationQueryHelper(aliasHelper)

    // Relacionamentos
    relationHelper.applyRelations(qb, rootAlias, relations)

    // Filtro por isActive
    if (props.isActive !== undefined) {
      filters.push({ field: 'isActive', operator: '=', value: props.isActive })
    }

    // Filtros personalizados
    filterHelper.applyFilters(qb, filters)

    // Busca textual
    if (props.search && searchFields.length > 0) {
      searchHelper.applySearch(qb, props.search, searchFields)
    }

    // Ordenação
    for (const [field, dir] of Object.entries(order)) {
      qb.addOrderBy(aliasHelper.getColumnPath(field), dir.toUpperCase() as 'ASC' | 'DESC')
    }

    // Paginação
    const skip = Number(props.offset ?? 0)
    const take = Number(props.limit ?? 10)
    qb.skip(skip).take(take)

    // Select customizado
    if (selectField.length > 0) {
      const fields = normalizeSelectFields(selectField, order, aliasHelper)
      qb.select(fields)
    }

    const [data, count] = await qb.getManyAndCount()

    return {
      count,
      limit: take,
      offset: skip,
      data,
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
    relations: string[] = [],
    filters: DataBase.Filters[] = [],
  ): Promise<Partial<T>[]> {
    try {
      const qb = this.createQueryBuilder(this.entityName)
      const rootAlias = qb.alias

      const aliasHelper = new QueryAliasHelper(rootAlias)
      const filterHelper = new FilterQueryHelper(aliasHelper)
      const searchHelper = new SearchQueryHelper(aliasHelper)
      const relationHelper = new RelationQueryHelper(aliasHelper)

      // Relacionamentos
      relationHelper.applyRelations(qb, rootAlias, relations)

      // Filtro por isActive
      if (props.isActive !== undefined) {
        filters.push({ field: 'isActive', operator: '=', value: props.isActive })
      }

      // Filtros personalizados
      filterHelper.applyFilters(qb, filters)

      // Busca textual
      if (props.search && searchFields.length > 0) {
        searchHelper.applySearch(qb, props.search, searchFields)
      }

      // Ordenação
      for (const [field, dir] of Object.entries(order)) {
        qb.addOrderBy(aliasHelper.getColumnPath(field), dir.toUpperCase() as 'ASC' | 'DESC')
      }

      // Select customizado
      if (select.length > 0) {
        const normalizedFields = normalizeSelectFields(select, order, aliasHelper)
        qb.select(normalizedFields)
      }

      return await qb.getMany()
    } catch (e: any) {
      this.logger.error(`Error in findForSelectByCriteria: ${e.message}`, e.stack)
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
   * Remove object and its relationships from the database.
   */
  async removeObjectDatabase(id: string, relations: string[] = []): Promise<void> {
    try {
      const repository = this.manager.getRepository(this.target)

      const entity = await repository.findOne({
        where: { id } as FindOptionsWhere<any>,
        relations,
      })

      if (!entity) {
        const entityName = typeof this.target === 'function' ? this.target.name : String(this.target)
        throw new NotFoundException(`${entityName} with id '${id}' not found`)
      }

      await repository.remove(entity)

      const entityName = typeof this.target === 'function' ? this.target.name : String(this.target)
      this.logger.log(`Removed ${entityName} and related entities for id: ${id}`)
    } catch (e) {
      this.logger.error(`RemoveObjectDatabase: ${id}`, e)
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
        where: { id, isActive: true } as any,
      })

      if (!entityExists) throw new Error('Entity not found or already deleted')

      await repository.update(id, {
        isActive: false,
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
