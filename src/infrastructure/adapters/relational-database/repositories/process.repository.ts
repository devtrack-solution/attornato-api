import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { ProcessRepositoryOutboundPort, ProcessRepositoryOutboundPortSymbol } from '@/domain/process/ports/outbound/process-repository.outbound-port'
import { ProcessBaseEntity } from '@/infrastructure/adapters/relational-database/entities/process-base.entity'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(ProcessRepositoryOutboundPortSymbol)
export class ProcessRepository extends RepositoryBase<ProcessBaseEntity> implements ProcessRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(ProcessBaseEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
