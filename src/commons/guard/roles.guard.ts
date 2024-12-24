/**
 * Created by Wilton Oliveira Ferreira on 20/02/2023
 */

import { Injectable, type CanActivate, type ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PERMISSIONS_KEY } from '@/commons/guard/permissions.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly loggerRoles = new Logger(RolesGuard.name)

  constructor(private readonly reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string[]): boolean {
    const set = new Set(userRole)
    return roles.some((role) => set.has(role))
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<any[]>(PERMISSIONS_KEY, context.getHandler())
    const request = context.switchToHttp().getRequest()

    if (permissions === undefined || permissions === null || permissions.length === 0) {
      return true
    }

    if (!this.matchRoles(permissions, request?.headers?.roles)) {
      throw new UnauthorizedException()
    } else {
      return true
    }
  }
}
