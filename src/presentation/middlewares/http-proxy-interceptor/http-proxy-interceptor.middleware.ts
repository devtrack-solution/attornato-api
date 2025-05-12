import { Injectable, Logger, type NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'

@Injectable()
export class HttpProxyInterceptorMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(HttpProxyInterceptorMiddleware.name)
  private config: AppConfig = new ConfigEnvironmentService()

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: () => void): Promise<any> {
    const exceptionsUrl = ['/auth/login', '/auth/forgot/password', '/auth/guest/reset-password']
    const url = req.originalUrl
    this.logger.log('URL:', url)
    if (!exceptionsUrl.includes(url)) {
      if (url.includes('/auth/onboarding')) {
        try {
          if(!req.headers.authorization) {
            throw new UnauthorizedException()
          }
          const token = (req.headers.authorization as string).replace('Bearer ', '')
          const privateKey = Buffer.from(this.config.jwt.privateKeyBase64, 'base64').toString('utf-8')
          const tokenValue = await this.jwtService.verifyAsync(token, {
            secret: privateKey,
          })
          ;(req as any).headers.profile = {
            accountId: tokenValue.profile?.accountId ?? '',
            roles: tokenValue.profile?.roles ?? [],
          }
          req.headers['x-idempotency-key']
        } catch (e: any) {
          console.error(e)
          throw new UnauthorizedException()
        }
      } else {
        try {
          if(!req.headers.authorization) {
            throw new UnauthorizedException()
          }
          const token = (req.headers.authorization as string).replace('Bearer ', '')
          const privateKey = Buffer.from(this.config.jwt.privateKeyBase64, 'base64').toString('utf-8')
          const tokenValue = await this.jwtService.verifyAsync(token, {
            secret: privateKey,
          })
          if (!tokenValue.profile?.name) {
            throw new UnauthorizedException('Passe pelo /auth/onboarding')
          }
          ;(req as any).headers.profile = {
            accountId: tokenValue.profile?.accountId ?? '',
            name: tokenValue.profile?.name ?? '',
            email: tokenValue.profile?.email ?? '',
            avatar: tokenValue.profile?.avatar ?? '',
            role: tokenValue.profile?.role ?? {},
            preferences: tokenValue.profile?.preferences ?? [],
          }
          req.headers['x-idempotency-key']
        } catch (e: any) {
          console.error(e)
          throw new UnauthorizedException()
        }
      }
    }
    next()
  }
}
