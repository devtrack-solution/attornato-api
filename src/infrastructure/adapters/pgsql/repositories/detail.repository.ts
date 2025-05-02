import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { DetailEntity } from '@/infrastructure/adapters/pgsql/entities/detail.entity'
import { DetailRepositoryOutboundPort, DetailRepositoryOutboundPortSymbol } from '@/domain/process/component/detail/ports/outbound/detail-repository.outbound-port'

@BindProvider(DetailRepositoryOutboundPortSymbol)
export class DetailRepository extends RepositoryBase<DetailEntity> implements DetailRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(DetailEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
