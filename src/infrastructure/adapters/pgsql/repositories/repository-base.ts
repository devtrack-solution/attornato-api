import { FindManyOptions, FindOptionsWhere, ILike, ObjectLiteral, Repository } from 'typeorm'
import { EntityTarget } from 'typeorm/common/EntityTarget'
import { EntityManager } from 'typeorm/entity-manager/EntityManager'
import { QueryRunner } from 'typeorm/query-runner/QueryRunner'
import { Logger } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'

export abstract class RepositoryBase<T extends ObjectLiteral> extends Repository<T> {
  protected readonly logger: Logger
  protected constructor(target: EntityTarget<T>, manager: EntityManager, queryRunner?: QueryRunner) {
    super(target, manager, queryRunner)
    this.logger = new Logger(this.constructor.name)
  }

  async saveObject(input: T): Promise<void> {
    try {
      await this.save(input)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

  async findByCriteria(props: Criteria.ById): Promise<Partial<T> | null> {
    try {
      const filters: FindOptionsWhere<T | any> = {
        where: {
          id: props?.id,
          // name: undefined,
          // description: props?.search ? ILike(`%${props.search}%`) : undefined,
          enable: true,
        },
        order: { description: 'ASC' },
        withDeleted: false,
      }
      return await this.findOneBy(filters)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

  async findAllByCriteria(props: Criteria.ById): Promise<Partial<T>[]> {
    try {
      const filters: FindOptionsWhere<T | any> = {
        where: {
          id: props?.id,
          // name: undefined,
          // description: props?.search ? ILike(`%${props.search}%`) : undefined,
          enable: true,
        },
        order: { description: 'ASC' },
        withDeleted: false,
      }
      return await this.findBy(filters)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

  async listToSelectByCriteria(props: Criteria.FindBy): Promise<T[]> {
    try {
      const filters: FindManyOptions<T | any> = {
        where: {
          name: undefined,
          description: props?.search ? ILike(`%${props.search}%`) : undefined,
          enable: true,
        },
        order: { description: 'ASC' },
        withDeleted: false,
      }
      const repository: Repository<T> = this.manager.getRepository(this.target)
      return await repository.find(filters)
    } catch (e) {
      this.logger.debug(`[listToSelectByCriteria] Error: ${e}`)
      throw e
    }
  }

  async updateObject(input: Partial<T>): Promise<void> {
    try {
      const loadInput = await this.findOneBy({ id: input.id })
      if (!loadInput) {
        throw new Error('Dados não encontrado')
      }
      Object.assign(loadInput, input)
      await this.save(loadInput)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

  async patchObject(input: Partial<T>, props: Criteria.ById): Promise<void> {
    try {
      const repository: Repository<T> = this.manager.getRepository(this.target)
      const where: FindOptionsWhere<T | any> = { id: props.id, enable: true }

      const loadInput = await repository.findOneBy(where)
      if (!loadInput) {
        throw new Error('Dados não encontrado')
      }
      Object.assign(loadInput, input)
      await this.save(loadInput)
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
