import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger, Injectable } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { EntityInvalidFormatException } from '@/core/domain/exceptions/entity-invalid-format.exception'
import { QueryFailedError, DataSource } from 'typeorm'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { TypeOrmErrorMapper } from '@/core/infrastructure/errors/typeorm-error-mapper'
import { ValidationErrorDetail } from '@/core/domain/validators/validation-error-detail'

@Injectable()
@Catch()
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(ValidationExceptionFilter.name)

  constructor(private readonly dataSource: DataSource) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let errorResponse: ValidationErrorResponse = new ValidationErrorResponse('Internal Server Error', [])

    // 🟢 Handle domain validation errors
    if (exception instanceof EntityInvalidFormatException) {
      status = HttpStatus.BAD_REQUEST
      errorResponse = exception.getResponse() as ValidationErrorResponse
    }
    // 🟠 Handle NestJS Http Exceptions
    else if (exception instanceof HttpException) {
      status = exception.getStatus()
      const httpResponse: any = exception.getResponse()

      if (typeof httpResponse === 'object' && httpResponse !== null) {
        errorResponse = new ValidationErrorResponse(httpResponse['message'] || 'HTTP Exception', httpResponse['errors'] || [])
      } else {
        errorResponse = new ValidationErrorResponse(httpResponse as string)
      }
    }
    // 🔴 Handle TypeORM Query Errors with Metadata Extraction
    else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST // or HttpStatus.CONFLICT (409)
      errorResponse = TypeOrmErrorMapper.map(exception, this.dataSource)
    }
    // ⚫ Handle unexpected errors
    else {
      this.logger.error(`Unhandled Exception: ${exception}`)
      errorResponse = new ValidationErrorResponse('Internal Server Error', [
        new ValidationErrorDetail({
          fieldName: 'unknown',
          message: exception instanceof Error ? exception.message : 'Unexpected error',
          value: null,
        }),
      ])
    }

    this.logger.error(JSON.stringify(errorResponse))
    response.status(status).send(errorResponse)
  }
}
