import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { v4 as uuidv4 } from 'uuid'
import { RoleRepositoryOutboundPort, RoleRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/role-repository.outbound-port'
import { PatchRoleInboundPort } from '@/domain/securities/ports/inbound/component/role/patch-role.inbound-port'
import { RoleType } from '@/domain/securities/types/role.type'
import { Role } from '@/domain/securities/business-objects/role.bo'
import { PermissionType } from '@/domain/securities/types/permission.type'
import { PermissionRepositoryOutboundPort, PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { Permission } from '@/domain/securities/business-objects/permission.bo'

@Injectable()
export class PatchRoleService implements PatchRoleInboundPort {
  private readonly logger = new Logger(PatchRoleService.name)

  constructor(
    @Inject(RoleRepositoryOutboundPortSymbol)
    private readonly roleRepository: RoleRepositoryOutboundPort,
    @Inject(PermissionRepositoryOutboundPortSymbol)
    private readonly permissionRepository: PermissionRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<RoleType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = ['permissions']
    if ((data?.permissionIds && data?.permissionIds?.length > 1) || (data?.permissions && data?.permissions?.length > 1)) {
      data.permissions = await this.buildPermissions(data)
    }
    await this.roleRepository.patchObject(data, criteria, Role, relations)
  }

  async buildPermissions(dto: Partial<RoleType.Input>): Promise<Permission[]> {
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
