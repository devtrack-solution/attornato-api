import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { FreeField2Entity } from '@/infrastructure/adapters/pgsql/entities/free-field-2.entity'
import { FreeField2RepositoryOutboundPort, FreeField2RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-2/ports/outbound/free-field-2-repository.outbound-port'

@BindProvider(FreeField2RepositoryOutboundPortSymbol)
export class FreeField2Repository extends RepositoryBase<FreeField2Entity> implements FreeField2RepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(FreeField2Entity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
