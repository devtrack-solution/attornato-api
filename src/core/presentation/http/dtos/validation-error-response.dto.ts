import { ApiProperty } from '@nestjs/swagger'
import { ValidationErrorDto } from '@/core/presentation/http/dtos/validation-error.dto'

export class ValidationErrorResponseDto {
  @ApiProperty({ example: 'Validation failed', description: 'Summary of the validation result' })
  message!: string

  @ApiProperty({ type: [ValidationErrorDto], description: 'Detailed validation errors' })
  errors!: ValidationErrorDto[]
}
