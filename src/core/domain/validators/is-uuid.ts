import { type Validator } from '@/core/domain/validators/validator'
import { ValueIsNotValidUuidError } from '@/commons/errors'

/**
 * Created by Laércio on 17/06/2024
 */
export class IsUUID implements Validator {
  constructor(
    readonly value: string | string[],
    readonly fieldName?: string,
  ) {}

  validate(): Error | undefined {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    const values = Array.isArray(this.value) ? this.value : [this.value]

    const invalidValues = values.filter((val) => !uuidRegex.test(val))

    if (invalidValues.length > 0) {
      return new ValueIsNotValidUuidError(this.fieldName)
    }
    return undefined
  }
}
