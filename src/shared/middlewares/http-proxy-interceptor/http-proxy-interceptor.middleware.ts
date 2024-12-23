import { Injectable, type NestMiddleware, UnauthorizedException } from '@nestjs/common'

import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify'

@Injectable()
export class HttpProxyInterceptorMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: () => void): Promise<any> {
    const exceptionsUrl = ['/login', '/auth/forgot/password', '/auth/guest/reset-password']
    const url = req.url
    console.log('URL:', url)
    if (!exceptionsUrl.includes(url)) {
      try {
        if (req.headers.get('authorization') !== undefined) {
          const token = (req?.headers?.get('authorization') as string)?.replace('Bearer ', '')
          const tokenValue = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get('jwt.privateKey'),
          })
          req.headers.set('username', tokenValue.user.username ?? '')
          req.headers.set('user_id', tokenValue.userId ?? '')
          req.headers.set('roles', [tokenValue.user.role] as any)
        }
      } catch (e: any) {
        console.error(e)
        throw new UnauthorizedException()
      }
    }
    next()
  }
}
