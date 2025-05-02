import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class ProcessFinancialDto extends BasicDto {
  @ApiProperty()
  hiring!: Date

  @ApiProperty()
  resJudicata!: Date

  @ApiProperty()
  closure!: Date

  @ApiProperty()
  sentence!: Date

  @ApiProperty()
  distribution!: Date

  @ApiProperty()
  execution!: Date

  @ApiProperty()
  causeValue!: number

  @ApiProperty()
  otherValue!: number

  @ApiProperty()
  contingency!: number
}
