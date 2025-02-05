import { IValidationError } from '@/core/domain/validators/interfaces/validation-error.interface'

export class ValidationErrorDetail implements IValidationError {
  fieldName: string
  value: any
  message: string

  constructor(init?: Partial<ValidationErrorDetail>) {
    this.fieldName = init?.fieldName ?? ''
    this.value = init?.value ?? null
    this.message = init?.message ?? ''
  }
}
