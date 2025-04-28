import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListToSelectPartnerInboundPort } from '@/domain/process/partner/ports/inbound/list-to-select-partner.inbound-port'
import { PartnerRepositoryOutboundPort, PartnerRepositoryOutboundPortSymbol } from '@/domain/process/partner/ports/outbound/partner-repository.outbound-port'
import { PartnerType } from '@/domain/process/partner/types/partner.type'
import { Partner } from '@/domain/process/partner/business-objects/partner.bo'

@Injectable()
export class ListToSelectPartnerService implements ListToSelectPartnerInboundPort {
  constructor(
    @Inject(PartnerRepositoryOutboundPortSymbol)
    private readonly partnerRepository: PartnerRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<PartnerType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  partner  = await this.partnerRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  partner .map(( partner ) => new Partner( partner  as PartnerType.Output).toJson())
  }
}
