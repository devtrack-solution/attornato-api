import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { FreeField1Entity } from '@/infrastructure/adapters/pgsql/entities/free-field-1.entity'
import { FreeField1RepositoryOutboundPort, FreeField1RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-1/ports/outbound/free-field-1-repository.outbound-port'

@BindProvider(FreeField1RepositoryOutboundPortSymbol)
export class FreeField1Repository extends RepositoryBase<FreeField1Entity> implements FreeField1RepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(FreeField1Entity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
