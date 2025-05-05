import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CreateDetailDto } from '@/presentation/controllers/http/process/component/detail/dtos/create-detail.dto'
import { CreateOriginDto } from '@/presentation/controllers/http/process/component/origin/dtos/create-origin.dto'
import { CreatePartnerDto } from '@/presentation/controllers/http/process/component/partner/dtos/create-partner.dto'
import { CreatePrognosisDto } from '@/presentation/controllers/http/process/component/prognosis/dtos/create-prognosis.dto'
import { CreateFreeField1Dto } from '@/presentation/controllers/http/process/component/process-detail/component/free-field-1/dtos/create-free-field-1.dto'
import { CreateFreeField2Dto } from '@/presentation/controllers/http/process/component/process-detail/component/free-field-2/dtos/create-free-field-2.dto'
import { CreateFreeField6Dto } from '@/presentation/controllers/http/process/component/process-detail/component/free-field-6/dtos/create-free-field-6.dto'

export class ProcessDetailDto extends BasicDto {
  @ApiPropertyOptional({ type: CreateDetailDto })
  detail?: CreateDetailDto

  @ApiProperty()
  detailId!: string

  @ApiProperty({ type: CreateFreeField1Dto })
  freeField1?: CreateFreeField1Dto

  @ApiProperty()
  freeField1Id!: string

  @ApiProperty({ type: CreateFreeField2Dto })
  freeField2?: CreateFreeField2Dto

  @ApiProperty()
  freeField2Id!: string

  @ApiProperty()
  freeField3!: string

  @ApiProperty()
  freeField4!: string

  @ApiProperty()
  freeField5!: string

  @ApiPropertyOptional({ type: CreateFreeField6Dto })
  freeField6?: CreateFreeField6Dto

  @ApiProperty()
  freeField6Id!: string

  @ApiPropertyOptional({ type: CreateOriginDto })
  origin?: CreateOriginDto

  @ApiProperty()
  originId!: string

  @ApiPropertyOptional({ type: CreatePartnerDto })
  partner?: CreatePartnerDto

  @ApiProperty()
  partnerId!: string

  @ApiPropertyOptional({ type: CreatePrognosisDto })
  prognosis?: CreatePrognosisDto

  @ApiProperty()
  prognosisId!: string
}
