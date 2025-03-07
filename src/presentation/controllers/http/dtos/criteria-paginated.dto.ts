import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Criteria } from '@/core/domain/types/criteria.type'

/**
 * DTO for pagination requests
 */
export class CriteriaPaginatedRequestDto implements Criteria.Paginated {
  @ApiPropertyOptional({ description: 'Search term to filter' })
  search!: string

  @ApiPropertyOptional({ description: 'isActive relative to deleted' })
  isActive?: boolean

  @ApiPropertyOptional({
    description: 'The number of items to skip before starting to collect the result set.',
    example: 0,
  })
  offset: number = 0

  @ApiPropertyOptional({
    description: 'The maximum number of items to return in the result set.',
    example: 10,
  })
  limit: number = 10
}

/**
 * Generic DTO for paginated responses
 */
export class CriteriaPaginatedResponseDto<T> {
  @ApiProperty({ description: 'Total number of records available', example: 100 })
  count!: number;

  @ApiProperty({ description: 'Number of records returned per page', example: 10 })
  limit!: number;

  @ApiProperty({ description: 'Offset for pagination', example: 0 })
  offset!: number;

  @ApiProperty({
    description: 'Data array containing the paginated items',
    isArray: true,
    type: Object,
  })
  data!: Partial<T>[];
}