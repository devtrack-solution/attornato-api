import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { PatchGroupCustomerInboundPort } from '@/domain/group-customer/ports/inbound/patch-group-customer.inbound-port'
import { GroupCustomerRepositoryOutboundPort, GroupCustomerRepositoryOutboundPortSymbol } from '@/domain/group-customer/ports/outbound/group-customer-repository.outbound-port'
import { GroupCustomerType } from '@/domain/group-customer/types/group-customer.type'
import { GroupCustomer } from '@/domain/group-customer/business-objects/group-customer.bo'

@Injectable()
export class PatchGroupCustomerService implements PatchGroupCustomerInboundPort {
  constructor(
    @Inject(GroupCustomerRepositoryOutboundPortSymbol)
    private readonly groupCustomerRepository: GroupCustomerRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<GroupCustomerType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.groupCustomerRepository.patchObject(data, criteria, GroupCustomer, relations)
  }
}
