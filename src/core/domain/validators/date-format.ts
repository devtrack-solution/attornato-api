import { InvalidDateFormatError } from '@/commons/errors'
import { type Validator } from '@/core/domain/validators/validator'

import { z, ZodString } from 'zod'

import { generateZodValidations, getDefaultFormats, ZodFormat } from '@/core/utils/zod.util'

export class DateFormatValidator implements Validator {
  constructor(
    private readonly value: string,
    private readonly fieldName: string = 'data',
    private readonly customFormats?: ZodFormat[],
    private readonly concatFormats: boolean = true,
  ) {}

  validate(): Error | undefined {
    let formatsToCheck: ZodString[] = this.concatFormats ? generateZodValidations(getDefaultFormats()).concat(generateZodValidations(this.customFormats!)) : generateZodValidations(this.customFormats!)
    const isValid = formatsToCheck.some((schema: ZodString) => {
      const result = schema.safeParse(this.value)
      return result.success
    })

    if (!isValid) {
      const formatDescriptions = this.customFormats?.map((format) => format.description || 'Custom Format') || getDefaultFormats().map((format) => format.description)
      return new InvalidDateFormatError(this.fieldName, formatDescriptions, this.value)
    }
  }
}
