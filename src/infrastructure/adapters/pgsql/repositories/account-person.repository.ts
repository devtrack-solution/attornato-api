import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { AccountPersonRepositoryOutboundPort, AccountPersonRepositoryOutboundPortSymbol } from '@/domain/account/component/account-person/ports/outbound/account-person-repository.outbound-port'
import { AccountPersonEntity } from '@/infrastructure/adapters/pgsql/entities/account-person.entity'

@BindProvider(AccountPersonRepositoryOutboundPortSymbol)
export class AccountPersonRepository extends RepositoryBase<AccountPersonEntity> implements AccountPersonRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(AccountPersonEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
