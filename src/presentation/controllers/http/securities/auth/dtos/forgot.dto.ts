import { ApiProperty } from '@nestjs/swagger'

export class ForgotDto {
  @ApiProperty({ required: true })
  username!: string
}
