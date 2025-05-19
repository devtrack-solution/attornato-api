import { Injectable, Logger, NestMiddleware, Req, RequestMethod } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { HttpAdapterHost } from '@nestjs/core'
import { generateIdempotencyKey } from '@/core/utils/idempotency.util'
import { IdempotencyService } from '@/infrastructure/adapters/redis/idempotency.service'

@Injectable()
export class IdempotencyMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(IdempotencyMiddleware.name)

  constructor(
    private readonly adapterHost: HttpAdapterHost,
    private readonly idempotencyService: IdempotencyService,
  ) {}

  async use(@Req() req: FastifyRequest, res: FastifyReply, next: () => void) {
    if (req.method === 'OPTIONS') {
      return next()
    }
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

    next()
  }
}
