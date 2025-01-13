/**
 * Created by Wilton Oliveira Ferreira on 17/01/2023
 */

import { type Validator } from '@/application/commons/validation/index'
import { type ResponseError } from '@/application/commons/helpers'

export class ValidationComposite implements Validator {
  constructor(private readonly validators: Validator[]) {}

  validate(): ResponseError | any {
    try {
      for (const validator of this.validators) {
        const error = validator.validate()
        if (error !== undefined) {
          throw error
        }
      }
    } catch (e) {
      throw e
    }
  }
}
