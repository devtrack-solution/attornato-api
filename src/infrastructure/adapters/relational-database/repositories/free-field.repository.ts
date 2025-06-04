import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { FreeFieldRepositoryOutboundPort, FreeFieldRepositoryOutboundPortSymbol } from '@/domain/client/component/person/contact-person/free-field/ports/outbound/free-field-repository.outbound-port'
import { FreeFieldEntity } from '@/infrastructure/adapters/relational-database/entities/free-field.entity'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(FreeFieldRepositoryOutboundPortSymbol)
export class FreeFieldRepository extends RepositoryBase<FreeFieldEntity> implements FreeFieldRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(FreeFieldEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
