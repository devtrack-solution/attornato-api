import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { CountyRepositoryOutboundPortSymbol, CountyRepositoryOutboundPort } from '@/domain/process/component/county/ports/outbound/county-repository.outbound-port'
import { CountyEntity } from '../entities/county.entity'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(CountyRepositoryOutboundPortSymbol)
export class CountyRepository extends RepositoryBase<CountyEntity> implements CountyRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(CountyEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
