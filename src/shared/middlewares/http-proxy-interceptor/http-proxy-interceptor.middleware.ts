import { Injectable, type NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { type NextFunction, type Request, type Response } from 'express'

import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class HttpProxyInterceptorMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    let tokenValue: any
    const exceptionsUrl = ['/login', '/auth/forgot/password', '/auth/guest/reset-password']
    const url = req.url
    console.log('URL:', url)
    if (!exceptionsUrl.includes(url)) {
      try {
        if (req.headers.authorization !== undefined) {
          const token = (req?.headers?.authorization).replace('Bearer ', '')
          const tokenValue = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get('jwt.privateKey'),
          })
          req.headers.username = tokenValue.user.username ?? ''
          req.headers.user_id = tokenValue.userId ?? ''
          req.headers.roles = [tokenValue.user.role]
        }
      } catch (e: any) {
        console.error(e)
        throw new UnauthorizedException()
      }
    }
    next()
  }
}
