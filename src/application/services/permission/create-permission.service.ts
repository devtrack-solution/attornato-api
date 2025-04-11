import { Inject, Injectable } from '@nestjs/common'
import { CreatePermissionInboundPort } from '@/domain/todo/ports/inbound/permission/create-permission.inbound-port'
import { PermissionType } from '@/domain/securities/types/permission.type'
import { PermissionRepositoryOutboundPort, PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { Permission } from '@/domain/securities/business-objects/permission.bo'

@Injectable()
export class CreatePermissionService implements CreatePermissionInboundPort {
  constructor(
    @Inject(PermissionRepositoryOutboundPortSymbol)
    private readonly permissionRepository: PermissionRepositoryOutboundPort,
  ) {}

  async execute(data: PermissionType.Input): Promise<PermissionType.Output> {
    let permission = new Permission(data)
    await this.permissionRepository.saveObject(permission.toPersistence())
    return permission.toJson()
  }
}
