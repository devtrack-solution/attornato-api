import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { AccountEntity } from '@/infrastructure/adapters/pgsql/entities/account.entity'
import { AccountRepositoryOutboundPort, AccountRepositoryOutboundPortSymbol } from '@/domain/account/ports/outbound/account-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'

@BindProvider(AccountRepositoryOutboundPortSymbol)
export class AccountRepository extends RepositoryBase<AccountEntity> implements AccountRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(AccountEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
