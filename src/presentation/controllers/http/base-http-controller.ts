import { ApiResponse } from '@nestjs/swagger'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'

@ApiResponse({
  status: 400,
  description: "The item hasn't been known",
  type: ValidationErrorResponse,
})
export abstract class BaseHttpController {}
