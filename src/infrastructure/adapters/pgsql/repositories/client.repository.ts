import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { ClientRepositoryOutboundPort, ClientRepositoryOutboundPortSymbol } from '@/domain/client/ports/outbound/client-repository.outbound-port'
import { ClientBaseEntity } from '@/infrastructure/adapters/pgsql/entities/client-base.entity'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(ClientRepositoryOutboundPortSymbol)
export class ClientRepository extends RepositoryBase<ClientBaseEntity> implements ClientRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(ClientBaseEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
