import { ApiPropertyOptional } from '@nestjs/swagger'
import { Criteria } from '@/core/domain/types/criteria.type'

export class ListMachineDto implements Criteria.Paginated {
  @ApiPropertyOptional({ description: 'Search term to filter machines', example: 'Laser Cutter' })
  search!: string

  @ApiPropertyOptional({ description: 'Search filter by', example: 'laser,cutter' })
  filterBy: string[] = []

  @ApiPropertyOptional({ description: 'isActive relative to deleted', example: 'Laser Cutter' })
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
