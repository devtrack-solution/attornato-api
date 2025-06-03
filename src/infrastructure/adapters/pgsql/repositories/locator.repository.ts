import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { LocatorRepositoryOutboundPortSymbol, LocatorRepositoryOutboundPort } from '@/domain/process/component/locator/ports/outbound/locator-repository.outbound-port'
import { LocatorEntity } from '../entities/locator.entity'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(LocatorRepositoryOutboundPortSymbol)
export class LocatorRepository extends RepositoryBase<LocatorEntity> implements LocatorRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(LocatorEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
