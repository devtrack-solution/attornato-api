import { z, ZodString } from 'zod'

type ZodFormat = {
  regex: RegExp
  description: string
}

const getDefaultFormats = (): ZodFormat[] => [
  {
    regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
    description: 'YYYY-MM-DDTHH:MM:SS',
  },
  {
    regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
    description: 'YYYY-MM-DDTHH:MM',
  },
  {
    regex: /^\d{4}-\d{2}-\d{2}$/,
    description: 'YYYY-MM-DD',
  },
  {
    regex: /^\d{2}-\d{2}-\d{4}T\d{2}:\d{2}:\d{2}$/,
    description: 'DD-MM-YYYYTHH:MM:SS',
  },
  {
    regex: /^\d{2}-\d{2}-\d{4}T\d{2}:\d{2}$/,
    description: 'DD-MM-YYYYTHH:MM',
  },
  {
    regex: /^\d{2}-\d{2}-\d{4}$/,
    description: 'DD-MM-YYYY',
  },
  {
    regex: /^\d{2}:\d{2}:\d{2}$/,
    description: 'HH:MM:SS',
  },
  {
    regex: /^\d{2}:\d{2}$/,
    description: 'HH:MM',
  },
]

const generateZodValidations = (formats: ZodFormat[]): ZodString[] => {
  if (!formats || formats.length === 0) {
    return [] as ZodString[]
  }
  return formats.map((format: ZodFormat): ZodString => z.string().regex(format.regex, format.description))
}

export { getDefaultFormats, generateZodValidations, ZodFormat }
