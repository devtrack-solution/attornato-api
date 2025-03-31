import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeleteGroupCustomerInboundPort } from '@/domain/group-customer/ports/inbound/delete-group-customer.inbound-port'
import { GroupCustomerRepositoryOutboundPort, GroupCustomerRepositoryOutboundPortSymbol } from '@/domain/group-customer/ports/outbound/group-customer-repository.outbound-port'

@Injectable()
export class DeleteGroupCustomerService implements DeleteGroupCustomerInboundPort {
  constructor(
    @Inject(GroupCustomerRepositoryOutboundPortSymbol)
    private readonly groupCustomerRepository: GroupCustomerRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.groupCustomerRepository.deleteObject(criteria.id)
  }
}
