import { RequiredFieldError } from '@/commons/errors'
import { type IValidator } from '@/core/domain/validators/interfaces/validator.interface'

export class Required implements IValidator {
  constructor(
    readonly value: any,
    readonly fieldName?: string,
  ) {}

  validate(): void {
    if (this.value === null || this.value === undefined) {
      throw new RequiredFieldError(this.fieldName)
    }
  }
}

export class RequiredString extends Required {
  constructor(
    override readonly value: string,
    override readonly fieldName?: string,
  ) {
    super(value, fieldName)
  }

  override validate(): Error | undefined {
    if (super.validate() !== undefined || this.value === '') {
      return new RequiredFieldError(this.fieldName)
    }
  }
}

export class RequiredBuffer extends Required {
  constructor(
    override readonly value: Buffer,
    override readonly fieldName?: string,
  ) {
    super(value, fieldName)
  }

  override validate(): Error | undefined {
    if (super.validate() !== undefined || this.value.length === 0) {
      return new RequiredFieldError(this.fieldName)
    }
  }
}
