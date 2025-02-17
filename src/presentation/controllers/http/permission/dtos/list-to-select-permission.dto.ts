import { ApiPropertyOptional } from '@nestjs/swagger'

export class ListToSelectPermissionDto {
  @ApiPropertyOptional()
  search!: string
}
