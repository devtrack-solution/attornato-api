import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { PartnerEntity } from '@/infrastructure/adapters/pgsql/entities/partner.entity'
import { PartnerRepositoryOutboundPort, PartnerRepositoryOutboundPortSymbol } from '@/domain/process/partner/ports/outbound/partner-repository.outbound-port'

@BindProvider(PartnerRepositoryOutboundPortSymbol)
export class PartnerRepository extends RepositoryBase<PartnerEntity> implements PartnerRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(PartnerEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
