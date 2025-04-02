import { Inject, Injectable } from '@nestjs/common'
import { ListPartnerInboundPort } from '@/domain/partner/ports/inbound/list-partner.inbound-port'
import { PartnerRepositoryOutboundPort, PartnerRepositoryOutboundPortSymbol } from '@/domain/partner/ports/outbound/partner-repository.outbound-port'
import { Partner } from '@/domain/partner/business-objects/partner.bo'
import { PartnerType } from '@/domain/partner/types/partner.type'
import { Criteria } from '@/core/domain/types/criteria.type'

@Injectable()
export class ListPartnerService implements ListPartnerInboundPort {
  constructor(
    @Inject(PartnerRepositoryOutboundPortSymbol)
    private readonly partnerRepository: PartnerRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<PartnerType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.partnerRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let  partner  = result.data.map(( partner ) =>  partner  as PartnerType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data:  partner ,
    }
  }
}
