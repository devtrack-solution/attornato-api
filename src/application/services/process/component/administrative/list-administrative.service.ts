import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListAdministrativeInboundPort } from '@/domain/process/component/administrative/ports/inbound/list-administrative.inbound-port'
import { AdministrativeRepositoryOutboundPortSymbol, AdministrativeRepositoryOutboundPort } from '@/domain/process/component/administrative/ports/outbound/administrative-repository.outbound-port'
import { AdministrativeType } from '@/domain/process/component/administrative/types/administrative.type'

@Injectable()
export class ListAdministrativeService implements ListAdministrativeInboundPort {
  constructor(
    @Inject(AdministrativeRepositoryOutboundPortSymbol)
    private readonly administrativeRepository: AdministrativeRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<AdministrativeType.OutputPaginated> {
    const select: string[] = []
    const relations: string[] = [
      'client',
      'localProcedureName',
      'proceduralStatus',
      'county',
      'phase',
      'practiceArea',
      'responsible',
      'actionObject',
      'locator',
      'subject',
      'processFinancial',
      'processDetail.detail',
      'processDetail.freeField1',
      'processDetail.freeField2',
      'processDetail.freeField6',
      'processDetail.origin',
      'processDetail.partner',
      'processDetail.prognosis',
    ]
    const searchFields: string[] = [
      'client.profile.name'
    ]
    const order = { createdAt: 'ASC' }
    let result = await this.administrativeRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let administrative = result.data.map((administrative) => administrative as AdministrativeType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: administrative,
    }
  }
}
