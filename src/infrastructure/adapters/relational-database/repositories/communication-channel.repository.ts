import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { CommunicationChannelEntity } from '@/infrastructure/adapters/relational-database/entities/communication-channel.entity'
import {
  CommunicationChannelRepositoryOutboundPort,
  CommunicationChannelRepositoryOutboundPortSymbol,
} from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/outbound/communication-channel-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(CommunicationChannelRepositoryOutboundPortSymbol)
export class CommunicationChannelRepository extends RepositoryBase<CommunicationChannelEntity> implements CommunicationChannelRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(CommunicationChannelEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
