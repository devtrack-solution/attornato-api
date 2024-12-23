/**
 * Created by Laércio Ávila on 12/08/2024
 */

import { ValueIsNotValidError, MaxValueError } from '@/shared/errors'
import { type Validator } from '@/shared/validation/validator'

export class MaxValue implements Validator {
  constructor(
    readonly value: any,
    readonly max: number,
    readonly fieldName?: string,
  ) {}

  validate(): Error | undefined {
    if (typeof this.value === 'string') {
      if (this.value.length > this.max) {
        return new MaxValueError(this.fieldName, this.value, this.max)
      }
    } else if (typeof this.value === 'number') {
      if (this.value > this.max) {
        return new MaxValueError(this.fieldName, this.value, this.max)
      }
    } else {
      return new ValueIsNotValidError(this.fieldName, this.value, 'Tipo de valor inválido')
    }
  }
}
