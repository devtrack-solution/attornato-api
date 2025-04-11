import { ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { FastifyRequest } from 'fastify'
import { JwtService } from '@nestjs/jwt'
import { LoadRolesFromCredentialInboundPort, LoadRolesFromCredentialInboundPortToken } from '@/domain/securities/ports/inbound/load-roles-from-credential.inbound-port'
import { AuthGuard } from '@nestjs/passport'
import { PERMISSIONS_KEY } from '@/infrastructure/adapters/http/auth/permission.decorator'


@Injectable()
export class RBACGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    @Inject(LoadRolesFromCredentialInboundPortToken)
    private loadRolesFromCredential: LoadRolesFromCredentialInboundPort,
  ) {
    super()
  }

  override async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [context.getHandler(), context.getClass()])

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true // sem permissão definida, acesso liberado
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>()
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false
    }

    const token = authHeader.replace('Bearer ', '')
    const payload = await this.jwtService.verifyAsync(token)

    const employeeId = payload.sub

    const credencial = await this.loadRolesFromCredential.execute({
      id: payload.id,
    })

    // Flatten all permissions from all roles
    const permissions = new Set<string>()

    // Verifica se todas as permissões requeridas estão presentes
    return requiredPermissions.every((perm) => permissions.has(perm))
  }
}
