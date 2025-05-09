import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { AccountEntity } from '@/infrastructure/adapters/pgsql/entities/account.entity'
import { AccountRepositoryOutboundPort, AccountRepositoryOutboundPortSymbol } from '@/domain/account/ports/outbound/account-repository.outbound-port'

@BindProvider(AccountRepositoryOutboundPortSymbol)
export class AccountRepository extends RepositoryBase<AccountEntity> implements AccountRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(AccountEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
