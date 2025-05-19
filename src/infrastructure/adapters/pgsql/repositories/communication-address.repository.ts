import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import {
  CommunicationAddressRepositoryOutboundPort,
  CommunicationAddressRepositoryOutboundPortSymbol,
} from '@/domain/client/component/person/communication-address/ports/outbound/communication-address-repository.outbound-port'
import { CommunicationAddressEntity } from '@/infrastructure/adapters/pgsql/entities/communication-address.entity'

@BindProvider(CommunicationAddressRepositoryOutboundPortSymbol)
export class CommunicationAddressRepository extends RepositoryBase<CommunicationAddressEntity> implements CommunicationAddressRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(CommunicationAddressEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
