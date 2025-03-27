import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreatePhaseInboundPortToken, CreatePhaseInboundPort } from '@/domain/phase/ports/inbound/create-phase-responsible.inbound-port'
import { DeletePhaseInboundPortToken, DeletePhaseInboundPort } from '@/domain/phase/ports/inbound/delete-phase.inbound-port'
import { ListPhaseInboundPortToken, ListPhaseInboundPort } from '@/domain/phase/ports/inbound/list-phase.inbound-port'
import { ListToSelectPhaseInboundPortToken, ListToSelectPhaseInboundPort } from '@/domain/phase/ports/inbound/list-to-select-phase.inbound-port'
import { PatchPhaseInboundPortToken, PatchPhaseInboundPort } from '@/domain/phase/ports/inbound/patch-phase.inbound-port'
import { CreatePhaseDto } from './dtos/create-phase.dto'
import { ListPhaseDto } from './dtos/list-phase.dto'
import { ListToSelectPhaseDto } from './dtos/list-to-select-phase.dto'
import { PatchPhaseDto } from '@/presentation/controllers/http/phase/dtos/patch-phase.dto'

@ApiTags('Phases')
@Controller('phases')
export class PhaseHttpController extends BaseHttpController {
  constructor(
    @Inject(CreatePhaseInboundPortToken) private readonly createPhaseService: CreatePhaseInboundPort,
    @Inject(ListPhaseInboundPortToken) private readonly listPhaseService: ListPhaseInboundPort,
    @Inject(PatchPhaseInboundPortToken) private readonly patchPhaseService: PatchPhaseInboundPort,
    @Inject(DeletePhaseInboundPortToken) private readonly deletePhaseService: DeletePhaseInboundPort,
    @Inject(ListToSelectPhaseInboundPortToken) private readonly listToSelectPhaseService: ListToSelectPhaseInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Phase' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreatePhaseDto) {
    return this.createPhaseService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Phase List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListPhaseDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listPhaseService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Phase' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchPhaseDto) {
    return this.patchPhaseService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Phase' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deletePhaseService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Phase List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectPhaseDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectPhaseService.execute(query)
  }
}
