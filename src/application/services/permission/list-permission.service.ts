import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PermissionRepositoryOutboundPort, PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { PermissionType } from '@/domain/securities/types/permission.type'
import { ListPermissionInboundPort } from '@/domain/securities/ports/inbound/component/permission/list-permission.inbound-port'

@Injectable()
export class ListPermissionService implements ListPermissionInboundPort {
  constructor(
    @Inject(PermissionRepositoryOutboundPortSymbol)
    private readonly permissionRepository: PermissionRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<PermissionType.OutputPaginated> {
    const select: string[] = []
    const relations: string[] = ['permissions']
    const searchFields: string[] = ['name', 'permissions.name']
    const order = { createdAt: 'ASC' }
    let result = await this.permissionRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let permission = result.data.map((permission) => permission as PermissionType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: permission,
    }
  }
}
