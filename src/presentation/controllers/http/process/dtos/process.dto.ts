import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CreateGroupProcessDto } from '@/presentation/controllers/http/process/component/group-process/dtos/create-group-process.dto'
import { CreateLocalProcedureNameDto } from '@/presentation/controllers/http/process/component/local-procedure-name/dtos/create-local-procedure-name].dto'
import { CreateProceduralStatusDto } from '@/presentation/controllers/http/process/component/procedural-status/dtos/create-procedural-status.dto'
import { CreateCountyDto } from '@/presentation/controllers/http/process/component/county/dtos/create-county.dto'
import { CreatePhaseDto } from '@/presentation/controllers/http/process/component/phase/dtos/create-phase.dto'
import { CreatePracticeAreaDto } from '@/presentation/controllers/http/process/component/practice-area/dtos/create-practice-area.dto'
import { CreateResponsibleDto } from '@/presentation/controllers/http/process/component/responsible/dtos/create-responsible.dto'
import { CreateActionObjectDto } from '@/presentation/controllers/http/process/component/action-object/dtos/create-action-object.dto'
import { CreateLocatorDto } from '@/presentation/controllers/http/process/component/locator/dtos/create-locator.dto'
import { CreateSubjectDto } from '@/presentation/controllers/http/process/component/subject/dtos/create-subject.dto'
import { CreateProcessDetailDto } from '@/presentation/controllers/http/process/component/process-detail/dtos/create-process-detail.dto'
import { CreateProcessFinancialDto } from '@/presentation/controllers/http/process/component/process-financial/dtos/create-process-financial.dto'
import { CreateClientDto } from '@/presentation/controllers/http/client/dtos/create-client.dto'

export class ProcessDto extends BasicDto {
  @ApiPropertyOptional({ type: CreateClientDto })
  client?: CreateClientDto

  @ApiProperty()
  clientId!: string

  @ApiProperty()
  processId!: string

  @ApiPropertyOptional({ type: CreateGroupProcessDto })
  groupProcess?: CreateGroupProcessDto

  @ApiProperty()
  groupProcessId!: string

  @ApiProperty()
  folder!: number

  @ApiProperty()
  label!: string

  @ApiProperty()
  favorite!: boolean

  @ApiProperty()
  processNumber!: string

  @ApiProperty()
  localProcedureNumber!: number

  @ApiPropertyOptional({ type: CreateLocalProcedureNameDto })
  localProcedureName?: CreateLocalProcedureNameDto

  @ApiProperty()
  localProcedureNameId!: string

  @ApiPropertyOptional({ type: CreateProceduralStatusDto })
  proceduralStatus?: CreateProceduralStatusDto

  @ApiProperty()
  proceduralStatusId!: string

  @ApiPropertyOptional({ type: CreateCountyDto })
  county?: CreateCountyDto

  @ApiProperty()
  countyId!: string

  @ApiProperty()
  countyUf!: string

  @ApiProperty()
  request!: string

  @ApiProperty()
  note!: string

  @ApiProperty()
  justiceSecret!: boolean

  @ApiProperty()
  captureProcedures!: boolean

  @ApiPropertyOptional({ type: CreatePhaseDto })
  phase?: CreatePhaseDto

  @ApiProperty()
  phaseId!: string

  @ApiPropertyOptional({ type: CreatePracticeAreaDto })
  practiceArea?: CreatePracticeAreaDto

  @ApiProperty()
  practiceAreaId!: string

  @ApiPropertyOptional({ type: CreateResponsibleDto })
  responsible?: CreateResponsibleDto

  @ApiProperty()
  responsibleId!: string

  @ApiPropertyOptional({ type: CreateActionObjectDto })
  actionObject?: CreateActionObjectDto

  @ApiProperty()
  actionObjectId!: string

  @ApiPropertyOptional({ type: CreateLocatorDto })
  locator?: CreateLocatorDto

  @ApiProperty()
  locatorId!: string

  @ApiPropertyOptional({ type: CreateSubjectDto })
  subject?: CreateSubjectDto

  @ApiProperty()
  subjectId!: string

  @ApiProperty({ type: CreateProcessFinancialDto })
  processFinancial!: CreateProcessFinancialDto

  @ApiProperty({ type: CreateProcessDetailDto })
  processDetail!: CreateProcessDetailDto
}
