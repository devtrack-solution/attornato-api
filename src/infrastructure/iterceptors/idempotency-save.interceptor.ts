import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { IdempotencyService } from '@/core/services/idempotency.service'

@Injectable()
export class IdempotencySaveInterceptor implements NestInterceptor {
  private readonly logger = new Logger(IdempotencySaveInterceptor.name)

  constructor(private readonly idempotencyService: IdempotencyService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest()
    const res = ctx.getResponse()
    const idempotencyKey = req.headers['x-idempotency-key'] as string

    return next.handle().pipe(
      tap(async (payload) => {
        if (idempotencyKey && res.statusCode < 400) {
          this.logger.log(`Saving response for idempotency key: ${idempotencyKey}`)
          await this.idempotencyService.saveKey(idempotencyKey, payload)
        }
      }),
    )
  }
}
