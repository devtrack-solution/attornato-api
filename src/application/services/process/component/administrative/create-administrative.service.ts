import { Administrative } from '@/domain/process/component/administrative/business-objects/administrative.bo'
import { CreateAdministrativeInboundPort } from '@/domain/process/component/administrative/ports/inbound/create-administrative-responsible.inbound-port'
import { AdministrativeRepositoryOutboundPortSymbol, AdministrativeRepositoryOutboundPort } from '@/domain/process/component/administrative/ports/outbound/administrative-repository.outbound-port'
import { AdministrativeType } from '@/domain/process/component/administrative/types/administrative.type'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateAdministrativeService implements CreateAdministrativeInboundPort {
  constructor(
    @Inject(AdministrativeRepositoryOutboundPortSymbol)
    private readonly administrativeRepository: AdministrativeRepositoryOutboundPort,
  ) {}

  async execute(data: AdministrativeType.Input): Promise<AdministrativeType.Output> {
    let  administrative  = new Administrative(data)
    await this.administrativeRepository.saveObject( administrative .toPersistence())
    return  administrative .toJson()
  }
}
