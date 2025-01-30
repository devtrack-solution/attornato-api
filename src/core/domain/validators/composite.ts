/**
 * Created by Wilton Oliveira Ferreira on 17/01/2023
 */

import { IValidator } from '@/core/domain/validators/index'
import { ResponseError } from '@/commons/helpers'

export class ValidationComposite implements IValidator {
  constructor(private readonly validators: IValidator[]) {}

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
