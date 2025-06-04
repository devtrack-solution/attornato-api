import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { PermissionRepositoryOutboundPort, PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { PermissionEntity } from '@/infrastructure/adapters/relational-database/entities/permission.entity'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(PermissionRepositoryOutboundPortSymbol)
export class PermissionRepository extends RepositoryBase<PermissionEntity> implements PermissionRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(PermissionEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }

  /*  override async saveObject(permission: Partial<PermissionType.Input>): Promise<void> {
    try {
      await this.save(permission)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

 async findByCriteria(props: Criteria.ById): Promise<Partial<PermissionType.Repository> | null> {
    try {
      return await this.findOneBy({ ...props })
      return null
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

 async deleteObject(id: string): Promise<void> {
    try {
      if (await this.existsBy({ id })) {
        await this.softRemove({ id })
      }
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

 async findAllByCriteria(props: Criteria.ById): Promise<Partial<PermissionType.Repository>[]> {
    try {
      return await this.findBy({ ...props })
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

  override async listToSelectByCriteria(props: PermissionType.Criteria): Promise<Partial<PermissionType.Repository>[]> {
    try {
      const filters: FindOptionsWhere<PermissionEntity> = {
        description: props?.search ? ILike(`%${props.search}%`) : undefined,
        enable: true,
      };

      return await this.dataSource.getRepository(PermissionEntity.target).find({
        where: filters,
        order: { description: 'ASC' },
        withDeleted: false,
      });

    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

 async updateObject(permission: Partial<PermissionType.Input>): Promise<void> {
    try {
      const loadPermission = await this.findOneBy({ id: permission.id })
      if (!loadPermission) {
        throw new Error('Dados não encontrado')
      }
      Object.assign(loadPermission, permission)
      await this.save(loadPermission)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

 async patchObject(permission: Partial<PermissionType.Input>, props: Criteria.ById): Promise<void> {
    try {
      const loadPermission = await this.findOneBy({ id: props.id })
      if (!loadPermission) {
        throw new Error('Dados não encontrado')
      }
      Object.assign(loadPermission, permission)
      await this.save(loadPermission)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }
  */
}
