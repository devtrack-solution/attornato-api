import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { EntityInvalidFormatException } from '@/core/domain/exceptions/entity-invalid-format.exception'

@Catch(EntityInvalidFormatException, HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(ValidationExceptionFilter.name)

  catch(exception: HttpException | EntityInvalidFormatException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()

    let status = HttpStatus.BAD_REQUEST

    this.logger.error(JSON.stringify(exception.getResponse()))
    response.status(status).send(exception.getResponse())
  }
}
