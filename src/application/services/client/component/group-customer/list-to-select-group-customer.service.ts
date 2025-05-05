import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListToSelectGroupCustomerInboundPort } from '@/domain/client/component/group-customer/ports/inbound/list-to-select-group-customer.inbound-port'
import { GroupCustomerRepositoryOutboundPort, GroupCustomerRepositoryOutboundPortSymbol } from '@/domain/client/component/group-customer/ports/outbound/group-customer-repository.outbound-port'
import { GroupCustomerType } from '@/domain/client/component/group-customer/types/group-customer.type'
import { GroupCustomer } from '@/domain/client/component/group-customer/business-objects/group-customer.bo'

@Injectable()
export class ListToSelectGroupCustomerService implements ListToSelectGroupCustomerInboundPort {
  constructor(
    @Inject(GroupCustomerRepositoryOutboundPortSymbol)
    private readonly groupCustomerRepository: GroupCustomerRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<GroupCustomerType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  groupCustomer  = await this.groupCustomerRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  groupCustomer .map(( groupCustomer ) => new GroupCustomer( groupCustomer  as GroupCustomerType.Output).toJson())
  }
}
