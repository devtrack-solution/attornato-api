import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { ProcessJudicialEntity } from '@/infrastructure/adapters/pgsql/entities/process-judicial.entity'
import { JudicialRepositoryOutboundPort, JudicialRepositoryOutboundPortSymbol } from '@/domain/process/component/judicial/ports/outbound/judicial-repository.outbound-port'

@BindProvider(JudicialRepositoryOutboundPortSymbol)
export class JudicialRepository extends RepositoryBase<ProcessJudicialEntity> implements JudicialRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(ProcessJudicialEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
