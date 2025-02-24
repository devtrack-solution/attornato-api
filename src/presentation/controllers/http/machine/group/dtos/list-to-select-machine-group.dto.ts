import { ApiPropertyOptional } from '@nestjs/swagger'
import { Criteria } from '@/core/domain/types/criteria.type'

export class ListToSelectMachineGroupDto implements Criteria.FindBy {
  @ApiPropertyOptional({ description: 'Search term to filter', example: 'Some Text' })
  search!: string

  @ApiPropertyOptional({ description: 'isActive relative to deleted' })
  isActive?: boolean
}
