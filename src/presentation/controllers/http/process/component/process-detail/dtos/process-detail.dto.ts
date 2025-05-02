import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CreateDetailDto } from '@/presentation/controllers/http/process/component/detail/dtos/create-detail.dto'
import { CreateOriginDto } from '@/presentation/controllers/http/process/component/origin/dtos/create-origin.dto'
import { CreatePartnerDto } from '@/presentation/controllers/http/process/component/partner/dtos/create-partner.dto'
import { CreatePrognosisDto } from '@/presentation/controllers/http/process/component/prognosis/dtos/create-prognosis.dto'
import { CreateFreeField1Dto } from '@/presentation/controllers/http/process/component/process-detail/component/free-field-1/dtos/create-free-field-1.dto'
import { CreateFreeField2Dto } from '@/presentation/controllers/http/process/component/process-detail/component/free-field-2/dtos/create-free-field-2.dto'
import { CreateFreeField6Dto } from '@/presentation/controllers/http/process/component/process-detail/component/free-field-6/dtos/create-free-field-6.dto'

export class ProcessDetailDto extends BasicDto {
  @ApiProperty({ type: CreateDetailDto })
  detail!: CreateDetailDto

  @ApiProperty({ type: CreateFreeField1Dto })
  freeField1!: CreateFreeField1Dto

  @ApiProperty({ type: CreateFreeField2Dto })
  freeField2!: CreateFreeField2Dto

  @ApiProperty()
  freeField3!: string

  @ApiProperty()
  freeField4!: string

  @ApiProperty()
  freeField5!: string

  @ApiProperty({ type: CreateFreeField6Dto })
  freeField6!: CreateFreeField6Dto

  @ApiProperty({ type: CreateOriginDto })
  origin!: CreateOriginDto

  @ApiProperty({ type: CreatePartnerDto })
  partner!: CreatePartnerDto

  @ApiProperty({ type: CreatePrognosisDto })
  prognosis!: CreatePrognosisDto
}
