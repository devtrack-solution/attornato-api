import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { PartnerEntity } from '@/infrastructure/adapters/relational-database/entities/partner.entity'
import { PartnerRepositoryOutboundPort, PartnerRepositoryOutboundPortSymbol } from '@/domain/process/component/partner/ports/outbound/partner-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(PartnerRepositoryOutboundPortSymbol)
export class PartnerRepository extends RepositoryBase<PartnerEntity> implements PartnerRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(PartnerEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
