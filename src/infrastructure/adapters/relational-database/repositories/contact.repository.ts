import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { ContactEntity } from '@/infrastructure/adapters/relational-database/entities/contact.entity'
import { ContactRepositoryOutboundPort, ContactRepositoryOutboundPortSymbol } from '@/domain/client/component/person/communication-address/contact/ports/outbound/contact-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(ContactRepositoryOutboundPortSymbol)
export class ContactRepository extends RepositoryBase<ContactEntity> implements ContactRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(ContactEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
