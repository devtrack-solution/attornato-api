/**
 * Created by Laércio Ávila on 12/08/2024
 */

import { ValueIsNotValidError } from '@/commons/errors'
import { type Validator } from '@/core/domain/validators/validator'

export class EndsWithZeroValidator implements Validator {
  constructor(
    private readonly value: string,
    private readonly fieldName?: string,
  ) {}

  validate(): Error | undefined {
    if (!this.value.endsWith('0')) {
      return new ValueIsNotValidError(this.fieldName, this.value, `Os minutos de ${this.fieldName} têm que terminar com zero. Valor atual: ${this.value}`)
    }
  }
}
