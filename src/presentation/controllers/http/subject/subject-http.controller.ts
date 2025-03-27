import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import {
  CreateSubjectInboundPort,
  CreateSubjectInboundPortToken,
} from '@/domain/subject/ports/inbound/create-subject-responsible.inbound-port'
import {
  ListSubjectInboundPort,
  ListSubjectInboundPortToken,
} from '@/domain/subject/ports/inbound/list-subject.inbound-port'
import {
  PatchSubjectInboundPort,
  PatchSubjectInboundPortToken,
} from '@/domain/subject/ports/inbound/patch-subject.inbound-port'
import {
  DeleteSubjectInboundPort,
  DeleteSubjectInboundPortToken,
} from '@/domain/subject/ports/inbound/delete-subject.inbound-port'
import {
  ListToSelectSubjectInboundPort,
  ListToSelectSubjectInboundPortToken,
} from '@/domain/subject/ports/inbound/list-to-select-subject.inbound-port'
import { CreateSubjectDto } from '@/presentation/controllers/http/subject/dtos/create-subject.dto'
import { ListSubjectDto } from '@/presentation/controllers/http/subject/dtos/list-subject.dto'
import { PatchSubjectDto } from '@/presentation/controllers/http/subject/dtos/patch-subject.dto'
import { ListToSelectSubjectDto } from '@/presentation/controllers/http/subject/dtos/list-to-select-subject.dto'

@ApiTags('Subject')
@Controller('subjects')
export class SubjectHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateSubjectInboundPortToken) private readonly createSubjectService: CreateSubjectInboundPort,
    @Inject(ListSubjectInboundPortToken) private readonly listSubjectService: ListSubjectInboundPort,
    @Inject(PatchSubjectInboundPortToken) private readonly patchSubjectService: PatchSubjectInboundPort,
    @Inject(DeleteSubjectInboundPortToken) private readonly deleteSubjectService: DeleteSubjectInboundPort,
    @Inject(ListToSelectSubjectInboundPortToken) private readonly listToSelectSubjectService: ListToSelectSubjectInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Subject' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateSubjectDto) {
    return this.createSubjectService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Subject List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListSubjectDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listSubjectService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Subject' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchSubjectDto) {
    return this.patchSubjectService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Subject' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteSubjectService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Subject List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectSubjectDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectSubjectService.execute(query)
  }
}
