import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { ResponsibleRepositoryOutboundPortSymbol, ResponsibleRepositoryOutboundPort } from '@/domain/process/responsible/ports/outbound/responsible-repository.outbound-port'
import { ResponsibleEntity } from '../entities/responsible.entity'

@BindProvider(ResponsibleRepositoryOutboundPortSymbol)
export class ResponsibleRepository extends RepositoryBase<ResponsibleEntity> implements ResponsibleRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(ResponsibleEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
