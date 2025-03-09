import { Inject, Injectable } from '@nestjs/common'
import { PatchPermissionInboundPort } from '@/domain/todo/ports/inbound/permission/patch-permission.inbound-port'
import { PermissionRepositoryOutboundPort, PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { PermissionType } from '@/domain/todo/types/permission.type'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Permission } from '@/domain/todo/business-objects/permission.bo'

@Injectable()
export class PatchPermissionService implements PatchPermissionInboundPort {
  constructor(
    @Inject(PermissionRepositoryOutboundPortSymbol)
    private readonly permissionRepository: PermissionRepositoryOutboundPort,
  ) {}

  async execute(data: PermissionType.Input, criteria: Criteria.ById): Promise<void> {
    await this.permissionRepository.patchObject(data, criteria, Permission)
  }
}
