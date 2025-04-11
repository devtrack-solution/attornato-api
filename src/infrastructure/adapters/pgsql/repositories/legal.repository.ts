import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { LegalEntity } from '@/infrastructure/adapters/pgsql/entities/legal.entity'
import { LegalRepositoryOutboundPort, LegalRepositoryOutboundPortSymbol } from '@/domain/legal/ports/outbound/legal-repository.outbound-port'

@BindProvider(LegalRepositoryOutboundPortSymbol)
export class LegalRepository extends RepositoryBase<LegalEntity> implements LegalRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(LegalEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
