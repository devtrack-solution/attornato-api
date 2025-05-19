import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { RoleEntity } from '@/infrastructure/adapters/pgsql/entities/role.entity'
import { RoleRepositoryOutboundPort, RoleRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/role-repository.outbound-port'

@BindProvider(RoleRepositoryOutboundPortSymbol)
export class RoleRepository extends RepositoryBase<RoleEntity> implements RoleRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
