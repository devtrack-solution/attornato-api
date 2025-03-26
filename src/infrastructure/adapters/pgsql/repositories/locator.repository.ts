import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { LocatorRepositoryOutboundPortSymbol, LocatorRepositoryOutboundPort } from '@/domain/locator/ports/outbound/locator-repository.outbound-port'
import { LocatorEntity } from '../entities/locator.entity'

@BindProvider(LocatorRepositoryOutboundPortSymbol)
export class LocatorRepository extends RepositoryBase<LocatorEntity> implements LocatorRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(LocatorEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
