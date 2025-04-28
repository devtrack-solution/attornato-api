import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CreatePrognosisInboundPort, CreatePrognosisInboundPortToken } from '@/domain/process/prognosis/ports/inbound/create-prognosis.inbound-port'
import { PatchPrognosisInboundPort, PatchPrognosisInboundPortToken } from '@/domain/process/prognosis/ports/inbound/patch-prognosis.inbound-port'
import { DeletePrognosisInboundPort, DeletePrognosisInboundPortToken } from '@/domain/process/prognosis/ports/inbound/delete-prognosis.inbound-port'
import { ListToSelectPrognosisInboundPort, ListToSelectPrognosisInboundPortToken } from '@/domain/process/prognosis/ports/inbound/list-to-select-prognosis.inbound-port'
import { CreatePrognosisDto } from '@/presentation/controllers/http/process/prognosis/dtos/create-prognosis.dto'
import { PatchPrognosisDto } from '@/presentation/controllers/http/process/prognosis/dtos/patch-prognosis.dto'
import { ListToSelectPrognosisDto } from '@/presentation/controllers/http/process/prognosis/dtos/list-to-select-prognosis.dto'
import { ListPrognosisDto } from '@/presentation/controllers/http/process/prognosis/dtos/list-prognosis.dto'
import { ListPrognosisInboundPort, ListPrognosisInboundPortToken } from '@/domain/process/prognosis/ports/inbound/list-prognosis.inbound-port'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'

@ApiTags('Process')
@Controller('process/prognosis')
export class PrognosisHttpController extends BaseHttpController {
  constructor(
    @Inject(CreatePrognosisInboundPortToken) private readonly createPrognosisService: CreatePrognosisInboundPort,
    @Inject(ListPrognosisInboundPortToken) private readonly listPrognosisService: ListPrognosisInboundPort,
    @Inject(PatchPrognosisInboundPortToken) private readonly patchPrognosisService: PatchPrognosisInboundPort,
    @Inject(DeletePrognosisInboundPortToken) private readonly deletePrognosisService: DeletePrognosisInboundPort,
    @Inject(ListToSelectPrognosisInboundPortToken) private readonly listToSelectPrognosisService: ListToSelectPrognosisInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Prognosis' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreatePrognosisDto) {
    return this.createPrognosisService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Prognosis List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListPrognosisDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listPrognosisService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Prognosis' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchPrognosisDto) {
    return this.patchPrognosisService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Prognosis' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deletePrognosisService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Prognosis List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectPrognosisDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectPrognosisService.execute(query)
  }
}
