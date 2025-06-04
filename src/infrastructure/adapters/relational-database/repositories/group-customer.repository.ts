import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { GroupCustomerEntity } from '@/infrastructure/adapters/relational-database/entities/group-customer.entity'
import { GroupCustomerRepositoryOutboundPort, GroupCustomerRepositoryOutboundPortSymbol } from '@/domain/client/component/group-customer/ports/outbound/group-customer-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(GroupCustomerRepositoryOutboundPortSymbol)
export class GroupCustomerRepository extends RepositoryBase<GroupCustomerEntity> implements GroupCustomerRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(GroupCustomerEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
