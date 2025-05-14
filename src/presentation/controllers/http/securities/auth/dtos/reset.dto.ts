import { ApiProperty } from '@nestjs/swagger'

export class ResetDto {
  @ApiProperty({ required: true })
  password!: string

  @ApiProperty({ required: true })
  passwordConfirm!: string
}
