import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PracticeAreaType } from '@/domain/practice-area/types/practice-area.type'
import {
  ListToSelectPracticeAreaInboundPort
} from '@/domain/practice-area/ports/inbound/list-to-select-practice-area.inbound-port'
import {
  PracticeAreaRepositoryOutboundPort,
  PracticeAreaRepositoryOutboundPortSymbol,
} from '@/domain/practice-area/ports/outbound/practice-area-repository.outbound-port'
import { PracticeArea } from '@/domain/practice-area/business-objects/practice-area.bo'

@Injectable()
export class ListToSelectPracticeAreaService implements ListToSelectPracticeAreaInboundPort {
  constructor(
    @Inject(PracticeAreaRepositoryOutboundPortSymbol)
    private readonly practiceAreaRepository: PracticeAreaRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<PracticeAreaType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  practiceArea  = await this.practiceAreaRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  practiceArea .map(( practiceArea ) => new PracticeArea( practiceArea  as PracticeAreaType.Output).toJson())
  }
}
