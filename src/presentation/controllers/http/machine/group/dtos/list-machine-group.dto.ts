import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListMachineGroupDto {
  @ApiPropertyOptional({ description: 'Search term to filter', example: 'Some Text' })
  search!: string

  @ApiPropertyOptional({ description: 'Search filter by', example: 'some,text' })
  filterBy: string[] = []

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
