import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { ContactPersonLegalEntity } from '@/infrastructure/adapters/pgsql/entities/contact-person-legal.entity'
import { ContactPersonLegalRepositoryOutboundPort, ContactPersonLegalRepositoryOutboundPortSymbol } from '@/domain/legal/contact-person-legal/ports/outbound/contact-person-repository.outbound-port'

@BindProvider(ContactPersonLegalRepositoryOutboundPortSymbol)
export class ContactPersonLegalRepository extends RepositoryBase<ContactPersonLegalEntity> implements ContactPersonLegalRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(ContactPersonLegalEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
