import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { ProcessRepositoryOutboundPort, ProcessRepositoryOutboundPortSymbol } from '@/domain/process/ports/outbound/process-repository.outbound-port'
import { ProcessBaseEntity } from '@/infrastructure/adapters/pgsql/entities/process-base.entity'

@BindProvider(ProcessRepositoryOutboundPortSymbol)
export class ProcessRepository extends RepositoryBase<ProcessBaseEntity> implements ProcessRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(ProcessBaseEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
