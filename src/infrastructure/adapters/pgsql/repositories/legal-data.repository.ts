import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { LegalDataEntity } from '@/infrastructure/adapters/pgsql/entities/legal-data.entity'
import { LegalDataRepositoryOutboundPort, LegalDataRepositoryOutboundPortSymbol } from '@/domain/legal/legal-data/ports/outbound/legal-data-repository.outbound-port'

@BindProvider(LegalDataRepositoryOutboundPortSymbol)
export class LegalDataRepository extends RepositoryBase<LegalDataEntity> implements LegalDataRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(LegalDataEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
