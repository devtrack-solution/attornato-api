/**
 * Created by Wilton Oliveira Ferreira on 17/03/2023
 */

import { ValueIsNotValidError, MinValueError } from '@/application/commons/errors'
import { type Validator } from '@/application/commons/validation/validator'

export class MinValue implements Validator {
  constructor(
    readonly value: any,
    readonly min: number,
    readonly fieldName?: string,
  ) {}

  validate(): Error | undefined {
    if (typeof this.value === 'string') {
      if (this.value.length < this.min) {
        return new MinValueError(this.fieldName, this.value, this.min)
      }
    } else if (typeof this.value === 'number') {
      if (this.value < this.min) {
        return new MinValueError(this.fieldName, this.value, this.min)
      }
    } else {
      return new ValueIsNotValidError(this.fieldName, this.value, 'Tipo de valor inválido')
    }
  }
}
