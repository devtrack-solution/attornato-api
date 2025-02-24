import { FindManyOptions, FindOptionsWhere, ILike, ObjectLiteral, Repository, DeepPartial } from 'typeorm'
import { EntityTarget } from 'typeorm/common/EntityTarget'
import { EntityManager } from 'typeorm/entity-manager/EntityManager'
import { QueryRunner } from 'typeorm/query-runner/QueryRunner'
import { Logger } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'

function getSearches(searchFields: string[], props: Criteria.FindBy) {
  return searchFields
    ? searchFields.reduce(
        (acc, field) => {
          const formattedField = field?.includes('.') ? `"${field}"` : field
          acc[formattedField] = props?.search ? ILike(`%${props.search}%`) : undefined
          return acc
        },
        {} as Record<string, any>,
      )
    : undefined
}

export abstract class RepositoryBase<T extends ObjectLiteral> extends Repository<T> {
  protected readonly logger: Logger

  protected constructor(target: EntityTarget<T>, manager: EntityManager, queryRunner?: QueryRunner) {
    super(target, manager, queryRunner)
    this.logger = new Logger(this.constructor.name)
  }

  async saveObject(input: DeepPartial<T>): Promise<void> {
    try {
      await this.manager.getRepository(this.target).save(input)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

  async findOneByCriteria(props: Criteria.ById, relations?: string[]): Promise<Partial<T> | null> {
    try {
      const filters: FindOptionsWhere<T | any> = {
        where: {
          id: props?.id,
          // name: undefined,
          // description: props?.search ? ILike(`%${props.search}%`) : undefined,
          enable: true,
        },
        relations,
        order: { description: 'ASC' },
        withDeleted: false,
      }
      return await this.findOne(filters)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

  async findAllByCriteria(
    props: Criteria.Paginated,
    order: Record<string, string> = { createdAt: 'ASC' },
    select: string[] = [],
    searchFields: string[] = [],
    relations: string[] = [],
  ): Promise<{
    count: number
    limit: number
    offset: number
    data: Partial<T>[]
  }> {
    try {
      const searches = getSearches(searchFields, props)

      const filters: FindManyOptions<T | any> = {
        select,
        where: {
          ...searches,
          // enable: props.isActive,
        },
        relations,
        order,
        withDeleted: props.isActive != undefined ? !props.isActive : undefined,
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
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

  async findForSelectByCriteria(props: Criteria.FindBy, order: Record<string, string> = { createdAt: 'ASC' }, select: string[] = [], searchFields: string[] = []): Promise<T[]> {
    try {
      const searches = getSearches(searchFields, props)
      const filters: FindManyOptions<T | any> = {
        select,
        where: {
          ...searches,
          // enable: true,
        },
        order,
        withDeleted: props.isActive != undefined ? !props.isActive : undefined,
      }
      const repository: Repository<T> = this.manager.getRepository(this.target)
      return await repository.find(filters)
    } catch (e) {
      this.logger.debug(`[listToSelectByCriteria] Error: ${e}`)
      throw e
    }
  }

  async updateObject(input: Partial<T>, props: Criteria.ById, relations?: string[]): Promise<void> {
    try {
      const repository: Repository<T> = this.manager.getRepository(this.target)
      const loadInput = await repository.findOne({
        where: { id: input.id },
        relations,
      })
      if (!loadInput) {
        throw new Error('Dados não encontrado')
      }
      Object.assign(loadInput, input)
      await repository.save(loadInput)
    } catch (e) {
      this.logger.error(`Error updating object: ${e}`)
      throw e
    }
  }

  async patchObject(input: Partial<T>, props: Criteria.ById, relations?: string[]): Promise<void> {
    try {
      const repository: Repository<T> = this.manager.getRepository(this.target)
      const where: FindOptionsWhere<T | any> = { id: props.id, enable: true }

      const loadInput = await repository.findOne({
        where,
        relations,
      })

      if (!loadInput) {
        throw new Error('Dados não encontrado')
      }
      Object.assign(loadInput, input)
      await repository.save(loadInput)
    } catch (e) {
      this.logger.error(`[pathObject] Error: ${e}`)
      throw e
    }
  }

  async deleteObject(id: string): Promise<void> {
    try {
      const repository: Repository<T> = this.manager.getRepository(this.target)
      const filters: FindManyOptions<T> = { id, enable: true } as FindManyOptions<T>

      if (await repository.exists(filters)) {
        await repository.softDelete(id)
      }
    } catch (e) {
      this.logger.error(`[deleteObject] Error: ${e}`)
      throw e
    }
  }
}
