import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { CommunicationChannelEntity } from '@/infrastructure/adapters/pgsql/entities/communication-channel.entity'
import { CommunicationChannelRepositoryOutboundPort, CommunicationChannelRepositoryOutboundPortSymbol } from '@/domain/communication-channel/ports/outbound/communication-channel-repository.outbound-port'

@BindProvider(CommunicationChannelRepositoryOutboundPortSymbol)
export class CommunicationChannelRepository extends RepositoryBase<CommunicationChannelEntity> implements CommunicationChannelRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(CommunicationChannelEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
