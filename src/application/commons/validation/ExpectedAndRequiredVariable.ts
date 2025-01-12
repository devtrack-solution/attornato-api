import { type Validator } from '@/application/commons/validation/validator'
import { ExpectedAndRequiredVariableError } from '@/application/commons/errors'

/**
 * Created by Laércio on 19/06/2024
 */

interface ExpectedProperties {
  [key: string]: string | ExpectedProperties | string[] | Array<string | null>
}

export class ExpectedAndRequiredVariable implements Validator {
  constructor(
    private readonly value: any,
    private readonly expectedProperties: ExpectedProperties,
    private readonly requiredProperties: string[] = [],
    private readonly fieldName?: string,
  ) {}

  validate(): Error | undefined {
    if (typeof this.value !== 'object' || this.value === null) {
      return new ExpectedAndRequiredVariableError(this.requiredProperties, Object.keys(this.expectedProperties), [])
    }

    const keys = Object.keys(this.value)
    const missingKeys = this.requiredProperties.filter((key) => !keys.includes(key))

    const unexpectedKeys = keys.filter((key) => !Object.keys(this.expectedProperties).includes(key) && this.value[key] !== undefined)
    const typeErrors: string[] = []

    for (const [key, type] of Object.entries(this.expectedProperties)) {
      if (keys.includes(key) && this.value[key] !== undefined) {
        if (Array.isArray(type)) {
          if (Array.isArray(this.value[key])) {
            if (!this.value[key].every((item: any) => typeof item === type[0])) {
              typeErrors.push(`${key} (expected array of ${type[0]}s)`)
            }
          } else {
            typeErrors.push(`${key} (expected array of ${type[0]}s)`)
          }
        } else if (typeof type === 'object') {
          // Validate nested objects
          const nestedValidator = new ExpectedAndRequiredVariable(this.value[key], type)
          const nestedError = nestedValidator.validate()
          if (nestedError) {
            typeErrors.push(`${key} (nested validation error)`)
          }
        } else if (Array.isArray(type) && type.includes('null')) {
          // Validate for multiple allowed types including null
          if (this.value[key] !== null && !type.includes(typeof this.value[key])) {
            typeErrors.push(`${key} (expected ${type.join(' or ')})`)
          }
        } else if (type === 'Date') {
          // Validate Date
          if (isNaN(Date.parse(this.value[key]))) {
            typeErrors.push(`${key} (expected Date)`)
          }
        } else if (type === 'boolean') {
          // Validate and convert boolean
          if (typeof this.value[key] === 'string') {
            if (this.value[key].toLowerCase() === 'true') {
              this.value[key] = true
            } else if (this.value[key].toLowerCase() === 'false') {
              this.value[key] = false
            } else if (this.value[key].toLowerCase() === 'number') {
              this.value[key] = parseFloat(this.value[key])
            } else {
              typeErrors.push(`${key} (expected boolean)`)
            }
          } else if (typeof this.value[key] !== 'boolean') {
            typeErrors.push(`${key} (expected boolean)`)
          }
        } else if (type === 'number') {
          // Validate and convert number
          if (typeof this.value[key] === 'string') {
            const parsedValue = parseFloat(this.value[key])
            if (!isNaN(parsedValue)) {
              this.value[key] = parsedValue
            } else {
              typeErrors.push(`${key} (expected number)`)
            }
          } else if (typeof this.value[key] !== 'number') {
            typeErrors.push(`${key} (expected number)`)
          }
        } else {
          if (typeof this.value[key] !== type) {
            typeErrors.push(`${key} (expected ${type})`)
          }
        }
      }
    }

    if (missingKeys.length > 0 || unexpectedKeys.length > 0 || typeErrors.length > 0) {
      const messages = []
      if (missingKeys.length > 0) {
        messages.push(`Missing properties/variables/attributes: ${missingKeys.join(', ')}`)
      }
      if (unexpectedKeys.length > 0) {
        messages.push(`Unexpected properties/variables/attributes: ${unexpectedKeys.join(', ')}`)
      }
      if (typeErrors.length > 0) {
        messages.push(`Type errors: ${typeErrors.join(', ')}`)
      }
      return new ExpectedAndRequiredVariableError(missingKeys, Object.keys(this.expectedProperties), unexpectedKeys.concat(typeErrors))
    }

    return undefined
  }
}
