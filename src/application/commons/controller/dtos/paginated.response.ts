/**
 * Created by Wilton Oliveira Ferreira on 17/03/2023
 */

import { ApiProperty } from '@nestjs/swagger'

export class PaginatedResponse {
  @ApiProperty()
  count!: number

  @ApiProperty()
  limit!: number

  @ApiProperty()
  offset!: number
}
