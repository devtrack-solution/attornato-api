import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { PersonEntity } from '@/infrastructure/adapters/pgsql/entities/person.entity'
import { PersonRepositoryOutboundPort, PersonRepositoryOutboundPortSymbol } from '@/domain/client/legal/person/ports/outbound/person-repository.outbound-port'

@BindProvider(PersonRepositoryOutboundPortSymbol)
export class PersonRepository extends RepositoryBase<PersonEntity> implements PersonRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(PersonEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
