import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeleteAdministrativeInboundPort } from '@/domain/process/component/administrative/ports/inbound/delete-administrative.inbound-port'
import { AdministrativeRepositoryOutboundPortSymbol, AdministrativeRepositoryOutboundPort } from '@/domain/process/component/administrative/ports/outbound/administrative-repository.outbound-port'

@Injectable()
export class DeleteAdministrativeService implements DeleteAdministrativeInboundPort {
  constructor(
    @Inject(AdministrativeRepositoryOutboundPortSymbol)
    private readonly administrativeRepository: AdministrativeRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.administrativeRepository.deleteObject(criteria.id)
  }
}
