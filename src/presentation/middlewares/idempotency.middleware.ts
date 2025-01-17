import { Injectable, NestMiddleware, BadRequestException, Logger } from '@nestjs/common'
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

  async use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const httpAdapter = this.adapterHost.httpAdapter
    const idempotencyKey = req.headers['x-idempotency-key'] as string
    const user = (req.headers['username'] as string) || 'unknown'
    const path = req.routerPath || '/'
    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency key is missing')
    }

    const newIdempotencyKey = generateIdempotencyKey(idempotencyKey, user, path)

    const cachedResponse = await this.idempotencyService.getKey(newIdempotencyKey)

    if (cachedResponse) {
      this.logger.log(`Cache hit for idempotency key: ${newIdempotencyKey}`)
      httpAdapter.reply(res, JSON.parse(cachedResponse), 200)
      return
    }

    req.headers['x-idempotency-key'] = newIdempotencyKey // Pass key for interceptor
    next()
  }
}
