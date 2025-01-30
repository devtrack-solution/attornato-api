/**
 * Created by Wilton Oliveira Ferreira on 17/03/2023
 */

import { ValueIsNotValidError, MinValueError } from '@/commons/errors'
import { IValidator } from '@/core/domain/validators/interfaces/validator.interface'

export class MinValue implements IValidator {
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
