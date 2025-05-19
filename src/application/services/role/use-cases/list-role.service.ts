import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { RoleRepositoryOutboundPort, RoleRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/role-repository.outbound-port'
import { ListRoleInboundPort } from '@/domain/securities/ports/inbound/component/role/list-role.inbound-port'
import { RoleType } from '@/domain/securities/types/role.type'

@Injectable()
export class ListRoleService implements ListRoleInboundPort {
  constructor(
    @Inject(RoleRepositoryOutboundPortSymbol)
    private readonly roleRepository: RoleRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<RoleType.OutputPaginated> {
    const select: string[] = []
    const relations: string[] = ['permissions']
    const searchFields: string[] = ['name', 'permissions.name']
    const order = { createdAt: 'ASC' }
    let result = await this.roleRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let role = result.data.map((role) => role as RoleType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: role,
    }
  }
}
