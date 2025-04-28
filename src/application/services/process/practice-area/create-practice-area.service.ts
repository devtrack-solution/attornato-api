import { Inject, Injectable } from '@nestjs/common'
import {
  PracticeAreaRepositoryOutboundPort,
  PracticeAreaRepositoryOutboundPortSymbol,
} from '@/domain/process/practice-area/ports/outbound/practice-area-repository.outbound-port'
import { CreatePracticeAreaInboundPort } from '@/domain/process/practice-area/ports/inbound/create-practice-area.inbound-port'
import { PracticeAreaType } from '@/domain/process/practice-area/types/practice-area.type'
import { PracticeArea } from '@/domain/process/practice-area/business-objects/practice-area.bo'

@Injectable()
export class CreatePracticeAreaService implements CreatePracticeAreaInboundPort {
  constructor(
    @Inject(PracticeAreaRepositoryOutboundPortSymbol)
    private readonly practiceAreaRepository: PracticeAreaRepositoryOutboundPort,
  ) {}

  async execute(data: PracticeAreaType.Input): Promise<PracticeAreaType.Output> {
    let  practiceArea  = new PracticeArea(data)
    await this.practiceAreaRepository.saveObject( practiceArea .toPersistence())
    return  practiceArea .toJson()
  }
}
