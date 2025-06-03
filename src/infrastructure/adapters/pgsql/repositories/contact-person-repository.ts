import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { ContactPersonEntity } from '@/infrastructure/adapters/pgsql/entities/contact-person.entity'
import { ContactPersonRepositoryOutboundPort, ContactPersonRepositoryOutboundPortSymbol } from '@/domain/client/component/person/contact-person/ports/outbound/contact-person-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(ContactPersonRepositoryOutboundPortSymbol)
export class ContactPersonRepository extends RepositoryBase<ContactPersonEntity> implements ContactPersonRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(ContactPersonEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
