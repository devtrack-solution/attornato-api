import { Inject, Injectable } from '@nestjs/common'
import { ProceduralStatusType } from '@/domain/process/component/procedural-status/types/procedural-status.type'
import { CreateProceduralStatusInboundPort } from '@/domain/process/component/procedural-status/ports/inbound/create-procedural-status.inbound-port'
import { ProceduralStatusRepositoryOutboundPort, ProceduralStatusRepositoryOutboundPortSymbol } from '@/domain/process/component/procedural-status/ports/outbound/procedural-status-repository.outbound-port'
import { ProceduralStatus } from '@/domain/process/component/procedural-status/business-objects/procedural-status.bo'

@Injectable()
export class CreateProceduralStatusService implements CreateProceduralStatusInboundPort {
  constructor(
    @Inject(ProceduralStatusRepositoryOutboundPortSymbol)
    private readonly proceduralStatusRepository: ProceduralStatusRepositoryOutboundPort,
  ) {}

  async execute(data: ProceduralStatusType.Input): Promise<ProceduralStatusType.Output> {
    let proceduralStatus = new ProceduralStatus(data)
    await this.proceduralStatusRepository.saveObject(proceduralStatus.toPersistence())
    return proceduralStatus.toJson()
  }
}
