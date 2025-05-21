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
import { number } from 'zod'

export class ProcessDto extends BasicDto {
  @ApiPropertyOptional({ type: CreateClientDto })
  client?: CreateClientDto

  @ApiProperty({ required: true })
  clientId!: string

  @ApiProperty({ required: true })
  processId!: string

  @ApiPropertyOptional({ type: CreateGroupProcessDto })
  groupProcess?: CreateGroupProcessDto

  @ApiProperty({ required: true })
  groupProcessId!: string

  @ApiProperty({ required: true })
  processNumber!: string

  @ApiProperty({ type: number, example: 1, required: true })
  folder!: number

  @ApiPropertyOptional()
  label?: string

  @ApiPropertyOptional()
  favorite?: boolean

  @ApiPropertyOptional()
  localProcedureNumber?: number

  @ApiPropertyOptional({ type: CreateLocalProcedureNameDto })
  localProcedureName?: CreateLocalProcedureNameDto

  @ApiPropertyOptional()
  localProcedureNameId?: string

  @ApiPropertyOptional({ type: CreateProceduralStatusDto })
  proceduralStatus?: CreateProceduralStatusDto

  @ApiPropertyOptional()
  proceduralStatusId?: string

  @ApiPropertyOptional({ type: CreateCountyDto })
  county?: CreateCountyDto

  @ApiPropertyOptional()
  countyId?: string

  @ApiPropertyOptional()
  countyUf?: string

  @ApiPropertyOptional()
  request?: string

  @ApiPropertyOptional()
  note?: string

  @ApiPropertyOptional()
  justiceSecret?: boolean

  @ApiPropertyOptional()
  captureProcedures?: boolean

  @ApiPropertyOptional({ type: CreatePhaseDto })
  phase?: CreatePhaseDto

  @ApiPropertyOptional()
  phaseId?: string

  @ApiPropertyOptional({ type: CreatePracticeAreaDto })
  practiceArea?: CreatePracticeAreaDto

  @ApiPropertyOptional()
  practiceAreaId?: string

  @ApiPropertyOptional({ type: CreateResponsibleDto })
  responsible?: CreateResponsibleDto

  @ApiPropertyOptional()
  responsibleId?: string

  @ApiPropertyOptional({ type: CreateActionObjectDto })
  actionObject?: CreateActionObjectDto

  @ApiPropertyOptional()
  actionObjectId?: string

  @ApiPropertyOptional({ type: CreateLocatorDto })
  locator?: CreateLocatorDto

  @ApiPropertyOptional()
  locatorId?: string

  @ApiPropertyOptional({ type: CreateSubjectDto })
  subject?: CreateSubjectDto

  @ApiPropertyOptional()
  subjectId?: string

  @ApiPropertyOptional({ type: CreateProcessFinancialDto })
  processFinancial?: CreateProcessFinancialDto

  @ApiPropertyOptional({ type: CreateProcessDetailDto })
  processDetail?: CreateProcessDetailDto
}
