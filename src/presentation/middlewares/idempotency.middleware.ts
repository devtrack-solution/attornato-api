import { Injectable, Logger, NestMiddleware, Req, RequestMethod, UnauthorizedException } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { HttpAdapterHost } from '@nestjs/core'
import { generateIdempotencyKey } from '@/core/utils/idempotency.util'
import { IdempotencyService } from '@/infrastructure/adapters/redis/idempotency.service'
import { JwtService } from '@nestjs/jwt'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'

@Injectable()
export class IdempotencyMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(IdempotencyMiddleware.name)
  private config: AppConfig = new ConfigEnvironmentService()

  constructor(
    private readonly adapterHost: HttpAdapterHost,
    private readonly idempotencyService: IdempotencyService,
    private readonly jwtService: JwtService,
  ) {}

  async use(@Req() req: FastifyRequest, res: FastifyReply, next: () => void) {
    const httpAdapter = this.adapterHost.httpAdapter
    this.logger.log(`HTTP Request IP: ${req.ip}, Method: ${req.method}, URL: ${req.originalUrl}`)
    const idempotencyKey = req.headers['x-idempotency-key'] as string
    this.logger.log(`Idempotency key: ${idempotencyKey}`)
    const user = (req.headers['username'] as string) || 'unknown'
    const path = req.routerPath || '/'
    if (!idempotencyKey && RequestMethod[req.method as keyof typeof RequestMethod] !== RequestMethod.OPTIONS) {
      httpAdapter.reply(res, 'Idempotency key is missing', 400)
    }

    const newIdempotencyKey = generateIdempotencyKey(idempotencyKey, user, path, req.method)

    const cachedResponse = await this.idempotencyService.getKey(newIdempotencyKey)

    if (cachedResponse) {
      this.logger.log(`Cache hit for idempotency key: ${newIdempotencyKey}`)
      httpAdapter.reply(res, JSON.parse(cachedResponse), 200)
      return
    }

    req.headers['x-idempotency-key'] = newIdempotencyKey

    const exceptionsUrl = ['/auth/login', '/auth/forgot/password', '/auth/guest/reset-password']
    const url = req.originalUrl
    this.logger.log('URL:', url)
    if (!exceptionsUrl.includes(url)) {
      if (url.includes('/auth/onboarding')) {
        try {
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
