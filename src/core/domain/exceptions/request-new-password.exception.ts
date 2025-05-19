import { HttpException, HttpStatus } from '@nestjs/common'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'

export class RequestNewPasswordException extends HttpException {
  error: ValidationErrorResponse | any[]

  constructor(error: ValidationErrorResponse) {
    super(error, HttpStatus.BAD_REQUEST)
    this.error = Array.isArray(error.errors) ? error : []
  }
}
