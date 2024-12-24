import { BadRequestError } from '@/commons/errors/http'
import { BadRequestException } from '@nestjs/common'

export class RequiredFieldError extends BadRequestError {
  constructor(fieldName?: string) {
    super()
    this.name = `RequiredFieldError ${fieldName}`
  }
}

export class InvalidMimeTypeError extends Error {
  constructor(allowed: string[]) {
    super(`Unsupported file. Allowed extensions: ${allowed.join(', ')}`)
    this.name = 'InvalidMimeTypeError'
  }
}

export class MaxFileSizeError extends Error {
  constructor(maxSizeInMb: number) {
    super(`File upload limit is ${maxSizeInMb}MB`)
    this.name = 'MaxFileSizeError'
  }
}

export class ValueIsNotValidEmailError extends BadRequestException {
  constructor(fieldName?: string) {
    super(`The field ${fieldName} is not valid`)
    this.name = 'ValueIsNotValidEmailError'
  }
}

export class ValueLengthIsNotValidError extends BadRequestException {
  constructor(fieldName?: string) {
    super(`The field ${fieldName} is not valid length`)
    this.name = 'ValueLengthIsNotValidError'
  }
}

export class ValueIsNotValidUuidError extends BadRequestException {
  constructor(fieldName?: string) {
    super(`${fieldName} is not a valid UUID`)
    this.name = 'ValueIsNotValidUuidError'
  }
}

export class ValueIsNotValidError extends Error {
  constructor(fieldName?: string, value?: string, message?: string) {
    const errorMessage = message || (fieldName ? `O valor fornecido para o campo "${fieldName}" não é válido.` : 'O valor fornecido não é válido .')
    super(errorMessage)
    this.name = 'ValueIsNotValidError'
  }
}

export class MinValueError extends ValueIsNotValidError {
  constructor(fieldName?: string, value?: any, min?: number) {
    const errorMessage = fieldName
      ? `O valor fornecido para o campo "${fieldName}" é menor que o permitido. Valor atual = ${value}, mínimo permitido = ${min}.`
      : `O valor fornecido é menor que o permitido. Valor atual = ${value}, mínimo permitido = ${min}.`
    super(fieldName, value, errorMessage)
    this.name = 'MinValueError'
  }
}

export class MaxValueError extends ValueIsNotValidError {
  constructor(fieldName?: string, value?: any, max?: number) {
    const errorMessage = fieldName
      ? `O valor fornecido para o campo "${fieldName}" é maior que o permitido. Valor atual = ${value}, máximo permitido = ${max}.`
      : `O valor fornecido é maior que o permitido. Valor atual = ${value}, máximo permitido = ${max}.`
    super(fieldName, value, errorMessage)
    this.name = 'MaxValueError'
  }
}
export class InvalidDateFormatError extends BadRequestException {
  constructor(fieldName: string, allowedFormats: string[], value?: string) {
    const formats = allowedFormats.join(', ')
    const errorMessage = `O valor fornecido para o campo "${fieldName}" não está em um formato válido. Valor atual: "${value}". Formatos permitidos: ${formats}.`
    super(errorMessage)
    this.name = 'InvalidDateFormatError'
  }
}

export class ExpectedAndRequiredVariableError extends BadRequestException {
  constructor(missingProperties?: string[], expectedProperties?: string[], unexpectedProperties?: string[]) {
    const missingPropsMessage = missingProperties?.length ? `Missing properties/variables/attributes: ${missingProperties.join(', ')}` : ''
    const unexpectedPropsMessage = unexpectedProperties?.length ? `Unexpected properties/variables/attributes: ${unexpectedProperties.join(', ')}` : ''
    const typeErrorsMessage = unexpectedProperties?.length ? `Type errors: ${unexpectedProperties.join(', ')}` : ''
    const message = [missingPropsMessage, unexpectedPropsMessage, typeErrorsMessage].filter(Boolean).join('. ')
    super(message || 'Unexpected error occurred')
    this.name = 'ExpectedAndRequiredVariableError'
  }
}
