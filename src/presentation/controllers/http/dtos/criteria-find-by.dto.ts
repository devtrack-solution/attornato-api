import { ApiPropertyOptional } from '@nestjs/swagger'
import { Criteria } from '@/core/domain/types/criteria.type'

export class CriteriaFindByRequestDto implements Criteria.FindBy {
  @ApiPropertyOptional({ description: 'Search term to filter'})
  search!: string

  @ApiPropertyOptional({ description: 'isActive relative to deleted' })
  isActive?: boolean
}
