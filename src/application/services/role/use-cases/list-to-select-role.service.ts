import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { RoleType } from '@/domain/securities/types/role.type'
import { ListToSelectRoleInboundPort } from '@/domain/securities/ports/inbound/component/role/list-to-select-role.inbound-port'
import { RoleRepositoryOutboundPort, RoleRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/role-repository.outbound-port'

@Injectable()
export class ListToSelectRoleService implements ListToSelectRoleInboundPort {
  constructor(
    @Inject(RoleRepositoryOutboundPortSymbol)
    private readonly roleRepository: RoleRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<RoleType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let role = await this.roleRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return role as RoleType.Output[]
  }
}
