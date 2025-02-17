import { Inject, Injectable } from '@nestjs/common'
import { DeletePermissionInboundPort } from '@/domain/todo/ports/inbound/permission/delete-permission.inbound-port'
import { PermissionRepositoryOutboundPort, PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

@Injectable()
export class DeletePermissionService implements DeletePermissionInboundPort {
  constructor(
    @Inject(PermissionRepositoryOutboundPortSymbol)
    private readonly permissionRepository: PermissionRepositoryOutboundPort,
  ) {}
  async execute(criteria: Criteria.ById): Promise<void> {
    await this.permissionRepository.deleteObject(criteria.id)
  }
}
