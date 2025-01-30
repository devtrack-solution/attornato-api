import { ValidationErrorDetail } from '@/core/domain/validators/validation-error-detail'

export class ValidationErrorResponse {
  message: string
  errors: ValidationErrorDetail[]

  constructor(message: string, errors: ValidationErrorDetail[] = []) {
    this.message = message
    this.errors = errors
  }
}
