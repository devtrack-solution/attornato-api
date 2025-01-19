import { type Validator, AllowedMimeTypes, type Extension, MaxFileSize, Required, RequiredBuffer, RequiredString } from '@/core/domain/validators/index'
import { DateFormatValidator } from '@/core/domain/validators/date-format'
import { EndsWithZeroValidator } from '@/core/domain/validators/end-zero'
import { IsEmail } from '@/core/domain/validators/is-email'
import { MaxValue } from '@/core/domain/validators/max-length'
import { MinValue } from '@/core/domain/validators/min-length'
import { IsUUID } from '@/core/domain/validators/is-uuid'
import { ExpectedAndRequiredVariable } from '@/core/domain/validators/ExpectedAndRequiredVariable'
import { ZodFormat } from '@/core/utils/zod.util'

export class ValidationBuilder {
  private constructor(
    private readonly value: any,
    private readonly fieldName?: string,
    private readonly validators: Validator[] = [],
  ) {}

  static of({ value, fieldName }: { value: any; fieldName?: string }): ValidationBuilder {
    return new ValidationBuilder(value, fieldName)
  }

  required(): ValidationBuilder {
    if (this.value === undefined) {
      this.validators.push(new Required(this.value, this.fieldName))
    } else if (this.value instanceof Buffer) {
      this.validators.push(new RequiredBuffer(this.value, this.fieldName))
    } else if (typeof this.value === 'string') {
      this.validators.push(new RequiredString(this.value, this.fieldName))
    } else {
      this.validators.push(new Required(this.value, this.fieldName))
      if (this.value.buffer !== undefined) {
        this.validators.push(new RequiredBuffer(this.value.buffer, this.fieldName))
      }
    }
    return this
  }

  image({ allowed, maxSizeInMb }: { allowed: Extension[]; maxSizeInMb: number }): ValidationBuilder {
    if (this.value.mimeType !== undefined) {
      this.validators.push(new AllowedMimeTypes(allowed, this.value.mimeType))
    }
    if (this.value.buffer !== undefined) {
      this.validators.push(new MaxFileSize(maxSizeInMb, this.value.buffer))
    }
    return this
  }

  uuid(): ValidationBuilder {
    if (typeof this.value === 'string' || Array.isArray(this.value)) {
      this.validators.push(new IsUUID(this.value, this.fieldName))
    }
    return this
  }

  uuidForFields(fields: Array<{ value: any; fieldName: string }>): ValidationBuilder {
    fields.forEach((field) => {
      if (field.value !== undefined && field.value !== null) {
        this.validators.push(new IsUUID(field.value, field.fieldName))
      }
    })
    return this
  }

  ExpectedAndRequiredVariable(expectedProperties: Record<string, string | string[]>, requiredProperties: string[] = []): ValidationBuilder {
    this.validators.push(new ExpectedAndRequiredVariable(this.value, expectedProperties, requiredProperties, this.fieldName))
    return this
  }

  isEmail(): ValidationBuilder {
    if (typeof this.value === 'string') {
      this.validators.push(new IsEmail(this.value, this.fieldName))
    }
    return this
  }

  minLength(min: number): ValidationBuilder {
    if (this.value !== undefined) {
      this.validators.push(new MinValue(this.value, min, this.fieldName))
    }
    return this
  }

  maxLength(length: number): ValidationBuilder {
    if (this.value !== undefined) {
      this.validators.push(new MaxValue(this.value, length, this.fieldName))
    }
    return this
  }

  dateFormat(formats?: ZodFormat[]): ValidationBuilder {
    this.validators.push(new DateFormatValidator(this.value, this.fieldName, formats))
    return this
  }

  endsWithZero(): ValidationBuilder {
    this.validators.push(new EndsWithZeroValidator(this.value, this.fieldName))
    return this
  }

  build(): Validator[] {
    return this.validators
  }
}
