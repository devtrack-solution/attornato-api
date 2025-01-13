import { ApiProperty } from '@nestjs/swagger'

export class DtoResponse {
  @ApiProperty()
  id!: string

  @ApiProperty()
  createdAt!: Date

  @ApiProperty()
  updatedAt!: Date

  @ApiProperty()
  isActive!: boolean
}
