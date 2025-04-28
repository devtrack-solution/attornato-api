import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { DetailsEntity } from '@/infrastructure/adapters/pgsql/entities/details.entity'
import {
  DetailsRepositoryOutboundPort,
  DetailsRepositoryOutboundPortSymbol,
} from '@/domain/process/details/ports/outbound/details-repository.outbound-port'

@BindProvider(DetailsRepositoryOutboundPortSymbol)
export class DetailsRepository extends RepositoryBase<DetailsEntity> implements DetailsRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(DetailsEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
