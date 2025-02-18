import { ApiPropertyOptional } from '@nestjs/swagger'
import { Criteria } from '@/core/domain/types/criteria.type'

export class ListToSelectMachineDto implements Criteria.FindBy {
  @ApiPropertyOptional({ description: 'Search term to filter machines', example: 'Laser Cutter' })
  search!: string

  @ApiPropertyOptional({ description: 'Search filter by', example: 'laser,cutter' })
  filterBy: string[] = []

  @ApiPropertyOptional({ description: 'isActive relative to deleted' })
  isActive?: boolean
}
