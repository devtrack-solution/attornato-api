import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { RoleEntity } from '@/infrastructure/adapters/relational-database/entities/role.entity'
import { RoleRepositoryOutboundPort, RoleRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/role-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'

@BindProvider(RoleRepositoryOutboundPortSymbol)
export class RoleRepository extends RepositoryBase<RoleEntity> implements RoleRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(RoleEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
