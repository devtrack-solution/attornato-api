import { Inject, Injectable, Logger, type NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class HttpProxyInterceptorMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(HttpProxyInterceptorMiddleware.name)
  constructor(
    @Inject(AppConfigToken)
    private readonly config: AppConfig,
    private readonly jwtService: JwtService
  ) {

  }

  async use(req: Request, res: Response, next: () => void): Promise<any> {
    const exceptionsUrl = ['/auth/login', '/auth/forgot/password', '/auth/guest/reset-password']
    const url = req.originalUrl
    this.logger.log('URL:', url)
    if (req.method === 'OPTIONS') return next()
    if (!exceptionsUrl.some((path) => url.startsWith(path))) {
      if (!req.headers.authorization) {
        throw new UnauthorizedException()
      }
      const token = (req.headers.authorization as string).replace('Bearer ', '')
      const key = Buffer.from(this.config.jwt.publicKeyBase64, 'base64').toString('utf-8')

      const tokenValue = await this.jwtService.verify(token as string, {
        secret: key,
        algorithms: ['RS512'],
      })
      if (url.includes('/auth/onboarding')) {
        try {
          ;(req as any).headers.profile = {
            accountId: tokenValue.profile?.accountId ?? '',
            roles: tokenValue.profile?.roles ?? [],
          }
        } catch (e: any) {
          console.error(e)
          throw new UnauthorizedException()
        }
      } else {
        try {
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
        } catch (e: any) {
          console.error(e)
          throw new UnauthorizedException()
        }
      }
    } else {
      this.logger.warn('URL excludes:', url)
    }
    next()
  }
}
