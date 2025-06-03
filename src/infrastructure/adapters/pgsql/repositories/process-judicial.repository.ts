import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { ProcessJudicialEntity } from '@/infrastructure/adapters/pgsql/entities/process-judicial.entity'
import { JudicialRepositoryOutboundPort, JudicialRepositoryOutboundPortSymbol } from '@/domain/process/component/judicial/ports/outbound/judicial-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(JudicialRepositoryOutboundPortSymbol)
export class JudicialRepository extends RepositoryBase<ProcessJudicialEntity> implements JudicialRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(ProcessJudicialEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
