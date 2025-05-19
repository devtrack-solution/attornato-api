import { Administrative } from '@/domain/process/component/administrative/business-objects/administrative.bo'
import { CreateAdministrativeInboundPort } from '@/domain/process/component/administrative/ports/inbound/create-administrative-responsible.inbound-port'
import { AdministrativeRepositoryOutboundPortSymbol, AdministrativeRepositoryOutboundPort } from '@/domain/process/component/administrative/ports/outbound/administrative-repository.outbound-port'
import { AdministrativeType } from '@/domain/process/component/administrative/types/administrative.type'
import { Inject, Injectable, Logger } from '@nestjs/common'

@Injectable()
export class CreateAdministrativeService implements CreateAdministrativeInboundPort {
  private readonly logger = new Logger(CreateAdministrativeService.name)

  constructor(
    @Inject(AdministrativeRepositoryOutboundPortSymbol)
    private readonly administrativeRepository: AdministrativeRepositoryOutboundPort,
  ) {}

  async execute(data: AdministrativeType.Input): Promise<AdministrativeType.Output> {
    let administrative = new Administrative(data)
    this.logger.log(JSON.stringify(administrative, null, 2))
    await this.administrativeRepository.saveObjectWithRelations(administrative.toPersistence())
    return administrative.toJson()
  }
}
