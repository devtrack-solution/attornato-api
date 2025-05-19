import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { RoleRepositoryOutboundPort, RoleRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/role-repository.outbound-port'
import { DeleteRoleInboundPort } from '@/domain/securities/ports/inbound/component/role/delete-role.inbound-port'

@Injectable()
export class DeleteRoleService implements DeleteRoleInboundPort {
  constructor(
    @Inject(RoleRepositoryOutboundPortSymbol)
    private readonly roleRepository: RoleRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.roleRepository.deleteObject(criteria.id)
  }
}
