import { Inject, Injectable } from '@nestjs/common'
import { CreateGroupCustomerInboundPort } from '@/domain/client/component/group-customer/ports/inbound/create-group-customer.inbound-port'
import { GroupCustomerRepositoryOutboundPort, GroupCustomerRepositoryOutboundPortSymbol } from '@/domain/client/component/group-customer/ports/outbound/group-customer-repository.outbound-port'
import { GroupCustomerType } from '@/domain/client/component/group-customer/types/group-customer.type'
import { GroupCustomer } from '@/domain/client/component/group-customer/business-objects/group-customer.bo'

@Injectable()
export class CreateGroupCustomerService implements CreateGroupCustomerInboundPort {
  constructor(
    @Inject(GroupCustomerRepositoryOutboundPortSymbol)
    private readonly groupCustomerRepository: GroupCustomerRepositoryOutboundPort,
  ) {}

  async execute(data: GroupCustomerType.Input): Promise<GroupCustomerType.Output> {
    let groupCustomer = new GroupCustomer(data)
    await this.groupCustomerRepository.saveObject(groupCustomer.toPersistence())
    return groupCustomer.toJson()
  }
}
