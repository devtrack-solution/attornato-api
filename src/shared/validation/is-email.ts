/**
 * Created by Wilton Oliveira Ferreira on 18/01/2023
 */

import { ValueIsNotValidEmailError } from '@/shared/errors'
import validator from 'validator'
import { type Validator } from '@/shared/validation/validator'

export class IsEmail implements Validator {
  constructor(
    readonly value: any,
    readonly fieldName?: string,
  ) {}

  validate(): Error | undefined {
    if (!validator.isEmail(this.value)) {
      return new ValueIsNotValidEmailError(this.fieldName)
    }
  }
}
