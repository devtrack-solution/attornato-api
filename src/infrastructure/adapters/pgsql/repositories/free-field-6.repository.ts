import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { FreeField6Entity } from '@/infrastructure/adapters/pgsql/entities/free-field-6.entity'
import { FreeField6RepositoryOutboundPort, FreeField6RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-6/ports/outbound/free-field-6-repository.outbound-port'

@BindProvider(FreeField6RepositoryOutboundPortSymbol)
export class FreeField6Repository extends RepositoryBase<FreeField6Entity> implements FreeField6RepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(FreeField6Entity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
