import { Injectable, type CanActivate, type ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PERMISSIONS_KEY } from '@/commons/guard/permissions.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  // private readonly loggerRoles = new Logger(RolesGuard.name)

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(PERMISSIONS_KEY, context.getHandler())
    const request = context.switchToHttp().getRequest()
    const userRole = request?.headers?.profile?.role?.name

    if (!requiredRoles || requiredRoles.length === 0) {
      return true
    }

    if (!userRole || !requiredRoles.includes(userRole)) {
      throw new UnauthorizedException(`Role ${userRole} not permitted`)
    }

    return true
  }
}
