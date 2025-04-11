import { ApiProperty } from '@nestjs/swagger'
import { IValidationError } from '@/core/domain/validators/interfaces/validation-error.interface'

export class ValidationErrorDto implements IValidationError {
  @ApiProperty({ example: 'birthday', description: 'Name of the field with validation error' })
  fieldName!: string

  @ApiProperty({ example: '2025-01-29T19:52:24.944Z', description: 'Invalid value provided' })
  value: any

  @ApiProperty({ example: 'Invalid date format', description: 'Error description' })
  message!: string
}
