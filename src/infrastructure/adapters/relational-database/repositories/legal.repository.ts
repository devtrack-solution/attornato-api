import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { LegalEntity } from '@/infrastructure/adapters/relational-database/entities/legal.entity'
import { LegalRepositoryOutboundPort, LegalRepositoryOutboundPortSymbol } from '@/domain/client/component/legal/ports/outbound/legal-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(LegalRepositoryOutboundPortSymbol)
export class LegalRepository extends RepositoryBase<LegalEntity> implements LegalRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(LegalEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
