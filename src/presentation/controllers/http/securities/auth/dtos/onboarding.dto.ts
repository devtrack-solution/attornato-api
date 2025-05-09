import { ApiProperty } from '@nestjs/swagger'

export class OnboardingDto {
  @ApiProperty({ required: true })
  roleId!: string

  accountId!: string
}
