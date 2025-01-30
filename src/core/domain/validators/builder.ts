import { EntityInvalidFormatException } from '@/core/domain/exceptions/entity-invalid-format.exception'
import { ValidationErrorDetail } from '@/core/domain/validators/validation-error-detail'
import { IValidationError } from '@/core/domain/validators/interfaces/validation-error.interface'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'

export class ValidationBuilder {
  private validations: ValidationErrorDetail[] = []
  private currentField?: IValidationError
  private hasErrors = false

  private constructor() {}

  static of({ value, fieldName, message }: { value: any; fieldName: string; message?: string }): ValidationBuilder {
    const instance = new ValidationBuilder()
    instance.currentField = new ValidationErrorDetail({ fieldName, value, message })
    return instance
  }

  private addError(description: string): void {
    if (this.currentField) {
      this.hasErrors = true
      this.validations.push(
        new ValidationErrorDetail({
          fieldName: this.currentField.fieldName,
          value: this.currentField.value,
          message: this.currentField.message || description,
        }),
      )
    }
  }

  required(): this {
    if (this.currentField && (this.currentField.value === null || this.currentField.value === undefined || this.currentField.value === '')) {
      this.addError('Field is required')
    }
    return this
  }

  dateFormat(validators: { regex: RegExp; description: string }[]): this {
    if (this.currentField) {
      const isValid = validators.some(({ regex }) => regex.test(this.currentField!.value))
      if (!isValid) {
        this.addError(`Invalid date format. Expected: ${validators.map((v) => v.description).join(', ')}`)
      }
    }
    return this
  }

  isEmail(): this {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (this.currentField && !emailRegex.test(this.currentField.value)) {
      this.addError('Invalid email format')
    }
    return this
  }

  emailBelongsToCorporateCompany(): this {
    const corporateDomains = ['company.com', 'business.org']
    if (this.currentField) {
      const domain = this.currentField.value.split('@')[1]
      if (!corporateDomains.includes(domain)) {
        this.addError('Email does not belong to a corporate domain')
      }
    }
    return this
  }

  of({ value, fieldName }: { value: any; fieldName: string }): this {
    if (this.hasErrors) {
      this.hasErrors = false
    } else {
      this.validations = this.validations.filter((v) => v.fieldName !== this.currentField?.fieldName)
    }

    this.currentField = new ValidationErrorDetail({ fieldName, value })
    return this
  }

  build(failMessage?: string): void {
    if (!this.hasErrors) {
      this.validations = this.validations.filter((v) => v.message)
    }

    if (this.validations.length > 0) {
      throw new EntityInvalidFormatException(new ValidationErrorResponse(failMessage || 'Validation failed', this.validations))
    }
  }
}
