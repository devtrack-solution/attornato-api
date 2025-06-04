import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { FreeField1Entity } from '@/infrastructure/adapters/relational-database/entities/free-field-1.entity'
import { FreeField1RepositoryOutboundPort, FreeField1RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-1/ports/outbound/free-field-1-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(FreeField1RepositoryOutboundPortSymbol)
export class FreeField1Repository extends RepositoryBase<FreeField1Entity> implements FreeField1RepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(FreeField1Entity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
