import { Injectable } from '@nestjs/common'
import { UpdatePermissionInboundPort } from '@/domain/todo/ports/inbound/permission/update-permission.inbound-port'
import { PermissionType } from '@/domain/todo/types/permission.type'

@Injectable()
export class UpdatePermissionService implements UpdatePermissionInboundPort {
  execute(): Promise<PermissionType.Output> {
    throw new Error('Method not implemented.')
  }
}
