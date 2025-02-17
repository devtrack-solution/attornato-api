import { Injectable } from '@nestjs/common'
import { ListPermissionInboundPort } from '@/domain/todo/ports/inbound/permission/list-permission.inbound-port'

@Injectable()
export class ListPermissionService implements ListPermissionInboundPort {
  execute(data: any, criteria?: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
