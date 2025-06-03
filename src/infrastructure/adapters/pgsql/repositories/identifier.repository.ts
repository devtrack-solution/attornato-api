import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { IdentifierEntity } from '@/infrastructure/adapters/pgsql/entities/identifier.entity'
import { IdentifierRepositoryOutboundPort, IdentifierRepositoryOutboundPortSymbol } from '@/domain/identifier/ports/outbound/identifier-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(IdentifierRepositoryOutboundPortSymbol)
export class IdentifierRepository extends RepositoryBase<IdentifierEntity> implements IdentifierRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(IdentifierEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
