/**
 * Created by Laércio Ávila on 12/08/2024
 */

import { InvalidDateFormatError } from '@/commons/errors'
import { type Validator } from '@/core/domain/validators/validator'

export class DateFormatValidator implements Validator {
  private readonly regexPatterns: RegExp[]
  private readonly formatDescriptions: string[]

  constructor(
    readonly value: string,
    readonly fieldName?: string,
    formats?: Array<{ regex: RegExp; description: string }>,
  ) {
    // Se formatos personalizados forem passados, use-os; caso contrário, use os padrões definidos
    const defaultFormats = [
      { regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, description: 'YYYY-MM-DDTHH:MM:SS' },
      { regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, description: 'YYYY-MM-DDTHH:MM' },
      { regex: /^\d{4}-\d{2}-\d{2}$/, description: 'YYYY-MM-DD' },
      { regex: /^\d{2}-\d{2}-\d{4}T\d{2}:\d{2}:\d{2}$/, description: 'DD-MM-YYYYTHH:MM:SS' },
      { regex: /^\d{2}-\d{2}-\d{4}T\d{2}:\d{2}$/, description: 'DD-MM-YYYYTHH:MM' },
      { regex: /^\d{2}-\d{2}-\d{4}$/, description: 'DD-MM-YYYY' },
      { regex: /^\d{2}:\d{2}:\d{2}$/, description: 'HH:MM:SS' },
      { regex: /^\d{2}:\d{2}$/, description: 'HH:MM' },
    ]

    const selectedFormats = formats || defaultFormats

    this.regexPatterns = selectedFormats.map((f) => f.regex)
    this.formatDescriptions = selectedFormats.map((f) => f.description)
  }

  validate(): Error | undefined {
    const isValid = this.regexPatterns.some((pattern) => pattern.test(this.value))

    if (!isValid) {
      return new InvalidDateFormatError(this.fieldName!, this.formatDescriptions, this.value)
    }
  }
}
