import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { ApiProperty } from '@nestjs/swagger'
import { EntityInvalidFormatException } from '@/core/domain/exceptions/entity-invalid-format.exception'

export class ValidationErrorDetail {
  @ApiProperty({ example: 'birthday', description: 'Name of the field with validation error' })
  fieldName: string

  @ApiProperty({ example: '2025-01-29T19:52:24.944Z', description: 'Invalid value provided' })
  value: any

  @ApiProperty({
    example: [{ regex: {}, description: 'YYYY-MM-DDTHH:MM:SS' }],
    description: 'List of custom formats expected by the field',
    required: false,
  })
  customFormats?: { regex: any; description: string }[]

  @ApiProperty({ example: true, description: 'Indicates if formats are concatenated', required: false })
  concatFormats?: boolean

  @ApiProperty({ example: { isDateString: 'Invalid date format' }, description: 'Validation constraints' })
  constraints?: Record<string, string>

  constructor(init?: Partial<ValidationErrorDetail>) {
    this.fieldName = init?.fieldName ?? ''
    this.value = init?.value ?? null
    this.customFormats = init?.customFormats
    this.concatFormats = init?.concatFormats
    this.constraints = init?.constraints
  }
}

export class ValidationErrorResponse {
  @ApiProperty({ example: 'Validation failed', description: 'Summary of the validation result' })
  message: string

  @ApiProperty({
    type: [ValidationErrorDetail],
    description: 'Detailed information about each validation error',
  })
  errors: ValidationErrorDetail[]

  constructor(message: string, errors: ValidationErrorDetail[] = []) {
    this.message = message
    this.errors = errors
  }
}

@Catch(EntityInvalidFormatException, HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(ValidationExceptionFilter.name)
  catch(exception: HttpException | EntityInvalidFormatException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()

    let status = HttpStatus.BAD_REQUEST
    let exceptionResponse: any = { message: 'Validation failed', errors: [] }

    // Handling custom validation exception
    if (exception instanceof EntityInvalidFormatException) {
      exceptionResponse = {
        message: exception.message,
        errors: exception.errors,
      }
    }
    // Handling NestJS HttpExceptions
    else {
      status = exception.getStatus()
      exceptionResponse = exception.getResponse() as any
    }

    // Format errors for response
    const formattedErrors = (exceptionResponse.errors || []).map(
      (error: any) =>
        new ValidationErrorDetail({
          fieldName: error.fieldName,
          value: error.value,
          customFormats: error.customFormats,
          concatFormats: error.concatFormats,
        }),
    )
    const validationError = new ValidationErrorResponse(exceptionResponse.message, formattedErrors)
    this.logger.error(JSON.stringify(validationError))
    response.status(status).send(validationError)
  }
}
