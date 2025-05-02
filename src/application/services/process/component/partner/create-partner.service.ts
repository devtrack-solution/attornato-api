import { Inject, Injectable } from '@nestjs/common'
import { CreatePartnerInboundPort } from '@/domain/process/component/partner/ports/inbound/create-partner.inbound-port'
import { PartnerRepositoryOutboundPort, PartnerRepositoryOutboundPortSymbol } from '@/domain/process/component/partner/ports/outbound/partner-repository.outbound-port'
import { PartnerType } from '@/domain/process/component/partner/types/partner.type'
import { Partner } from '@/domain/process/component/partner/business-objects/partner.bo'

@Injectable()
export class CreatePartnerService implements CreatePartnerInboundPort {
  constructor(
    @Inject(PartnerRepositoryOutboundPortSymbol)
    private readonly partnerRepository: PartnerRepositoryOutboundPort,
  ) {}

  async execute(data: PartnerType.Input): Promise<PartnerType.Output> {
    let  partner  = new Partner(data)
    await this.partnerRepository.saveObject( partner .toPersistence())
    return  partner .toJson()
  }
}
