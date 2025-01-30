/**
 * Created by Wilton Oliveira Ferreira on 18/01/2023
 */

import { ValueIsNotValidEmailError } from '@/commons/errors'
import validator from 'validator'
import { type IValidator } from '@/core/domain/validators/interfaces/validator.interface'

export class IsEmail implements IValidator {
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
