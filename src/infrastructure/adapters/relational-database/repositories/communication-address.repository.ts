import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import {
  CommunicationAddressRepositoryOutboundPort,
  CommunicationAddressRepositoryOutboundPortSymbol,
} from '@/domain/client/component/person/communication-address/ports/outbound/communication-address-repository.outbound-port'
import { CommunicationAddressEntity } from '@/infrastructure/adapters/relational-database/entities/communication-address.entity'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(CommunicationAddressRepositoryOutboundPortSymbol)
export class CommunicationAddressRepository extends RepositoryBase<CommunicationAddressEntity> implements CommunicationAddressRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(CommunicationAddressEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
