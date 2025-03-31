import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { ContactTypeEntity } from '@/infrastructure/adapters/pgsql/entities/contact-type.entity'
import { ContactTypeRepositoryOutboundPort, ContactTypeRepositoryOutboundPortSymbol } from '@/domain/contact-type/ports/outbound/contact-type-repository.outbound-port'

@BindProvider(ContactTypeRepositoryOutboundPortSymbol)
export class ContactTypeRepository extends RepositoryBase<ContactTypeEntity> implements ContactTypeRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(ContactTypeEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
