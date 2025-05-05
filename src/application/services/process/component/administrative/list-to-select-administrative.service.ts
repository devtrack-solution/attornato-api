import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Administrative } from '@/domain/process/component/administrative/business-objects/administrative.bo'
import { ListToSelectAdministrativeInboundPort } from '@/domain/process/component/administrative/ports/inbound/list-to-select-administrative.inbound-port'
import { AdministrativeRepositoryOutboundPortSymbol, AdministrativeRepositoryOutboundPort } from '@/domain/process/component/administrative/ports/outbound/administrative-repository.outbound-port'
import { AdministrativeType } from '@/domain/process/component/administrative/types/administrative.type'

@Injectable()
export class ListToSelectAdministrativeService implements ListToSelectAdministrativeInboundPort {
  constructor(
    @Inject(AdministrativeRepositoryOutboundPortSymbol)
    private readonly administrativeRepository: AdministrativeRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<AdministrativeType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  administrative  = await this.administrativeRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  administrative .map(( administrative ) => new Administrative( administrative  as AdministrativeType.Output).toJson())
  }
}
