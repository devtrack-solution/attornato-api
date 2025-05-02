import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { ClientRepositoryOutboundPort, ClientRepositoryOutboundPortSymbol } from '@/domain/client/ports/outbound/client-repository.outbound-port'
import { ClientBaseEntity } from '@/infrastructure/adapters/pgsql/entities/client-base.entity'

@BindProvider(ClientRepositoryOutboundPortSymbol)
export class ClientRepository extends RepositoryBase<ClientBaseEntity> implements ClientRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(ClientBaseEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
