import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { RoleType } from '@/domain/securities/types/role.type'
import { RoleRepositoryOutboundPort, RoleRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/role-repository.outbound-port'
import { Role } from '@/domain/securities/business-objects/role.bo'
import { CreateRoleInboundPort } from '@/domain/securities/ports/inbound/component/role/create-role.inbound-port'
import { PermissionRepositoryOutboundPort, PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { Permission } from '@/domain/securities/business-objects/permission.bo'
import { PermissionType } from '@/domain/securities/types/permission.type'

@Injectable()
export class CreateRoleService implements CreateRoleInboundPort {
  private readonly logger = new Logger(CreateRoleService.name)

  constructor(
    @Inject(RoleRepositoryOutboundPortSymbol)
    private readonly RoleRepository: RoleRepositoryOutboundPort,
    @Inject(PermissionRepositoryOutboundPortSymbol)
    private readonly permissionRepository: PermissionRepositoryOutboundPort,
  ) {}

  async execute(data: RoleType.Input): Promise<RoleType.Output> {
    data.permissions = await this.buildPermissions(data)
    let role = new Role(data)
    await this.RoleRepository.saveObjectWithRelations(role.toPersistence())
    return role.toJson()
  }

  async buildPermissions(dto: RoleType.Input): Promise<Permission[]> {
    const permissions: PermissionType.Input[] = []

    if (dto.permissions?.length) {
      for (const perm of dto.permissions) {
        permissions.push(perm)
      }
    }

    if (dto.permissionIds?.length) {
      for (const perm of dto.permissionIds) {
        try {
          const found = await this.permissionRepository.findOneByCriteria({ id: perm })
          if (found) {
            permissions.push(found as PermissionType.Input)
          }
        } catch (e) {
          this.logger.warn('buildPermissions', e)
        }
      }
    }
    if (permissions.length < 1) throw new BadRequestException('At least one permission is required')
    return permissions?.map((p) => new Permission(p))
  }
}
