/**
 * Created by Wilton Oliveira Ferreira on 17/03/2023
 */

import { ApiPropertyOptional } from '@nestjs/swagger'

export abstract class PaginatedRequest {
  @ApiPropertyOptional({ default: 0, type: Number })
  offset!: number

  @ApiPropertyOptional({ default: 10, type: Number })
  limit!: number

  constructor(offset: number, limit: number) {
    this.offset = offset
    this.limit = limit
  }
}
