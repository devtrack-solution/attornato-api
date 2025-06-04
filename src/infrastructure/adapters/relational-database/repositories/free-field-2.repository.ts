import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { FreeField2Entity } from '@/infrastructure/adapters/relational-database/entities/free-field-2.entity'
import { FreeField2RepositoryOutboundPort, FreeField2RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-2/ports/outbound/free-field-2-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(FreeField2RepositoryOutboundPortSymbol)
export class FreeField2Repository extends RepositoryBase<FreeField2Entity> implements FreeField2RepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(FreeField2Entity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
