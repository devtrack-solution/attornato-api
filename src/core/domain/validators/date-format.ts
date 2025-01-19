import { InvalidDateFormatError } from '@/commons/errors'
import { type Validator } from '@/core/domain/validators/validator'

import { z, ZodSchema, ZodString } from "zod";

const defaultFormats: ZodString[] = [
  z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, { message: 'YYYY-MM-DDTHH:MM:SS' }),
  z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}$/, { message: 'YYYY-MM-DDTHH:MM' }),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'YYYY-MM-DD' }),
  z.string().regex(/^\d{2}-\d{2}-\d{4}T\d{2}:\d{2}:\d{2}$/, { message: 'DD-MM-YYYYTHH:MM:SS' }),
  z.string().regex(/^\d{2}-\d{2}-\d{4}T\d{2}$/, { message: 'DD-MM-YYYYTHH:MM' }),
  z.string().regex(/^\d{2}-\d{2}-\d{4}$/, { message: 'DD-MM-YYYY' }),
  z.string().regex(/^\d{2}:\d{2}:\d{2}$/, { message: 'HH:MM:SS' }),
  z.string().regex(/^\d{2}:\d{2}$/, { message: 'HH:MM' }),
]

// Classe de validação utilizando Zod
export class DateFormatValidator implements Validator {
  constructor(
    private readonly value: string,
    private readonly fieldName: string = 'data',
    private readonly customFormats?: z.ZodString[]
  ) {}

  validate(): Error | undefined {
    const formatsToCheck = this.customFormats || defaultFormats

    // Verifica se pelo menos um dos schemas aceita o valor
    const isValid = formatsToCheck.some((schema) => {
      const result = schema.safeParse(this.value)
      return result.success
    })

    if (!isValid) {
     // Extract descriptions for the error message
      const formatDescriptions = this.customFormats?.map((format) => format.description || 'Custom Format')
        || defaultFormats.map((format) => format.description);

      return new InvalidDateFormatError(
        this.fieldName,
        formatDescriptions,
        this.value
      );
    }
  }
}