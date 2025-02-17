import { Inject, Injectable } from '@nestjs/common'
import { ListToSelectPermissionInboundPort } from '@/domain/todo/ports/inbound/permission/list-to-select-permission.inbound-port'
import { PermissionType } from '@/domain/todo/types/permission.type'

import { PermissionRepositoryOutboundPort, PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { Permission } from '@/domain/todo/business-objects/permission.bo'
import { Criteria } from '@/core/domain/types/criteria.type'

@Injectable()
export class ListToSelectPermissionService implements ListToSelectPermissionInboundPort {
  constructor(
    @Inject(PermissionRepositoryOutboundPortSymbol)
    private readonly permissionRepository: PermissionRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<PermissionType.Output[]> {
    let permissions = await this.permissionRepository.listToSelectByCriteria(criteria)
    return permissions.map((permission) => new Permission(permission as PermissionType.Output).toJson())
  }
}
