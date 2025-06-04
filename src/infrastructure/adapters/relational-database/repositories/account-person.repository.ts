import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { AccountPersonRepositoryOutboundPort, AccountPersonRepositoryOutboundPortSymbol } from '@/domain/account/component/account-person/ports/outbound/account-person-repository.outbound-port'
import { AccountPersonEntity } from '@/infrastructure/adapters/relational-database/entities/account-person.entity'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(AccountPersonRepositoryOutboundPortSymbol)
export class AccountPersonRepository extends RepositoryBase<AccountPersonEntity> implements AccountPersonRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(AccountPersonEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
