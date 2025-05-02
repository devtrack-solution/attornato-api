import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import {
  ProceduralStatusRepositoryOutboundPort, ProceduralStatusRepositoryOutboundPortSymbol,
} from '@/domain/process/component/procedural-status/ports/outbound/procedural-status-repository.outbound-port'
import {
  DeleteProceduralStatusInboundPort
} from '@/domain/process/component/procedural-status/ports/inbound/delete-procedural-status.inbound-port'

@Injectable()
export class DeleteProceduralStatusService implements DeleteProceduralStatusInboundPort {
  constructor(
    @Inject(ProceduralStatusRepositoryOutboundPortSymbol)
    private readonly proceduralStatusRepository: ProceduralStatusRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.proceduralStatusRepository.deleteObject(criteria.id)
  }
}
