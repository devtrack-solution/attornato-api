import { EntityInvalidFormatException } from '@/core/domain/exceptions/entity-invalid-format.exception'
import { ValidationErrorDetail } from '@/core/domain/validators/validation-error-detail'
import { IValidationError } from '@/core/domain/validators/interfaces/validation-error.interface'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { z } from 'zod'

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
    let result = { success: false }

    if (typeof this.currentField?.value === 'string') {
      result = z.string().min(1, { message: 'Field is required' }).safeParse(this.currentField?.value)
    } else if (typeof this.currentField?.value === 'number') {
      result = z
        .number({ required_error: 'Field is required' })
        .refine((val) => !isNaN(val), { message: 'Value must be a valid number' })
        .safeParse(this.currentField?.value)
    } else if (typeof this.currentField?.value === 'object') {
      result = z
        .object({})
        .refine((obj) => obj !== null && Object.keys(obj).length > 0, { message: 'Object is required and cannot be empty' })
        .safeParse(this.currentField?.value)
    } else {
      result = { success: false }
    }

    if (!result.success) {
      this.addError('Field is required')
    }

    return this
  }


  hasNoWhiteSpace(): this {
    if (this.currentField && typeof this.currentField.value === 'string' && /\s/.test(this.currentField.value)) {
      this.addError('Field contain whitespace')
    }
    return this
  }

  max(value: number): this {
    let result = { success: false }

    if (typeof this.currentField?.value == 'string') {
      result = z.string().max(value).safeParse(this.currentField?.value)
    }

    if (typeof this.currentField?.value == 'number') {
      result = z.number().max(value).safeParse(this.currentField?.value)
    }

    if (!result.success) {
      this.addError('Field exceeds maximum length')
    }
    return this
  }

  min(value: any): this {
    let result = { success: false }

    if (typeof this.currentField?.value == 'string') {
      result = z.string().min(value).safeParse(this.currentField?.value)
    }

    if (typeof this.currentField?.value == 'number') {
      result = z.number().min(value).safeParse(this.currentField?.value)
    }

    if (!result.success) {
      this.addError('Field is below minimum length')
    }
    return this
  }

  dateFormat(regex: RegExp): this {
    const isValid = regex.test(this.currentField?.value)
    if (!isValid) {
      this.addError(`Invalid date format.`)
    }
    return this
  }

  regex(customRegex: RegExp): this {
    if (!customRegex.test(this.currentField?.value)) {
      this.addError('Field does not match the required condition')
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

  isDate(): this {
    const result = z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date string' })
      .safeParse(this.currentField?.value)
    if (!result.success) {
      this.addError('Invalid date format')
    }
    return this
  }

  isDateOrNull(): this {
    const schema = z.date().nullable() // Permite Date ou null
    const result = schema.safeParse(this.currentField?.value)

    if (!result.success) {
      this.addError('Invalid date format or not null')
    }

    return this
  }
}
