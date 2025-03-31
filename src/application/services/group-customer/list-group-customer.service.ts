import { Inject, Injectable } from '@nestjs/common'
import { ListGroupCustomerInboundPort } from '@/domain/group-customer/ports/inbound/list-group-customer.inbound-port'
import { GroupCustomerRepositoryOutboundPort, GroupCustomerRepositoryOutboundPortSymbol } from '@/domain/group-customer/ports/outbound/group-customer-repository.outbound-port'
import { GroupCustomer } from '@/domain/group-customer/business-objects/group-customer.bo'
import { GroupCustomerType } from '@/domain/group-customer/types/group-customer.type'
import { Criteria } from '@/core/domain/types/criteria.type'

@Injectable()
export class ListGroupCustomerService implements ListGroupCustomerInboundPort {
  constructor(
    @Inject(GroupCustomerRepositoryOutboundPortSymbol)
    private readonly groupCustomerRepository: GroupCustomerRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<GroupCustomerType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.groupCustomerRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  groupCustomer  = result.data.map(( groupCustomer ) =>  groupCustomer  as GroupCustomerType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  groupCustomer ,
    }
  }
}
