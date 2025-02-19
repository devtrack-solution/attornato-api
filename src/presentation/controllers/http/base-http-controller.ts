import { ApiHeader, ApiResponse } from '@nestjs/swagger'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { UseFilters } from '@nestjs/common'
import { ValidationExceptionFilter } from '@/core/presentation/http/filters/validation-exception.filter'

@ApiHeader({
  name: 'x-idempotency-key',
  description: 'A unique key to ensure idempotency for the request',
  required: true,
})
@ApiResponse({
  status: 400,
  description: "The item hasn't been known",
  type: ValidationErrorResponse,
})
/*@ApiResponse({
  description: 'Missing required field',
  status: HttpStatus.BAD_REQUEST,
  type: ResponseError,
})
@ApiResponse({
  description: 'Unauthorized access',
  status: HttpStatus.UNAUTHORIZED,
  type: ResponseError,
})*/
@UseFilters(ValidationExceptionFilter)
export abstract class BaseHttpController {}
