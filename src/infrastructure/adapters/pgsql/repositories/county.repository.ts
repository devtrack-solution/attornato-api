import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { CountyRepositoryOutboundPortSymbol, CountyRepositoryOutboundPort } from '@/domain/county/ports/outbound/county-repository.outbound-port'
import { CountyEntity } from '../entities/county.entity'

@BindProvider(CountyRepositoryOutboundPortSymbol)
export class CountyRepository extends RepositoryBase<CountyEntity> implements CountyRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(CountyEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
