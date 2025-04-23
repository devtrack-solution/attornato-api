import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { ContactPersonRepositoryOutboundPort, ContactPersonRepositoryOutboundPortSymbol } from '@/domain/client/legal/contact-person/ports/outbound/contact-person-repository.outbound-port'
import { ContactPersonEntity } from '@/infrastructure/adapters/pgsql/entities/contact-person.entity'

@BindProvider(ContactPersonRepositoryOutboundPortSymbol)
export class ContactPersonRepository extends RepositoryBase<ContactPersonEntity> implements ContactPersonRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(ContactPersonEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
