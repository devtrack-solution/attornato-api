import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import {GroupCustomerEntity} from "@/infrastructure/adapters/pgsql/entities/group-customer.entity";
import { GroupCustomerRepositoryOutboundPort, GroupCustomerRepositoryOutboundPortSymbol } from '@/domain/client/group-customer/ports/outbound/group-customer-repository.outbound-port'

@BindProvider(GroupCustomerRepositoryOutboundPortSymbol)
export class GroupCustomerRepository extends RepositoryBase<GroupCustomerEntity> implements GroupCustomerRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(GroupCustomerEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
