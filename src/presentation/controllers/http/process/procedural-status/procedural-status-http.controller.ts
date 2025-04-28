import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import {
  PatchProceduralStatusDto
} from '@/presentation/controllers/http/process/procedural-status/dtos/patch-practice-area.dto'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import {
  CreateProceduralStatusInboundPort,
  CreateProceduralStatusInboundPortToken,
} from '@/domain/process/procedural-status/ports/inbound/create-procedural-status.inbound-port'
import {
  ListProceduralStatusInboundPort,
  ListProceduralStatusInboundPortToken,
} from '@/domain/process/procedural-status/ports/inbound/list-practice-area.inbound-port'
import {
  PatchProceduralStatusInboundPort,
  PatchProceduralStatusInboundPortToken,
} from '@/domain/process/procedural-status/ports/inbound/patch-procedural-status.inbound-port'
import {
  DeleteProceduralStatusInboundPort,
  DeleteProceduralStatusInboundPortToken,
} from '@/domain/process/procedural-status/ports/inbound/delete-procedural-status.inbound-port'
import {
  ListToSelectProceduralStatusInboundPort,
  ListToSelectProceduralStatusInboundPortToken,
} from '@/domain/process/procedural-status/ports/inbound/list-to-select-practice-area.inbound-port'
import {
  CreateProceduralStatusDto
} from '@/presentation/controllers/http/process/procedural-status/dtos/create-procedural-status.dto'
import {
  ListProceduralStatusDto
} from '@/presentation/controllers/http/process/procedural-status/dtos/list-procedural-status.dto'
import {
  ListToSelectProceduralStatusDto
} from '@/presentation/controllers/http/process/procedural-status/dtos/list-to-select-practice-area.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'

@ApiTags('Process')
@Controller('process/procedural-status')
export class ProceduralStatusHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateProceduralStatusInboundPortToken) private readonly createProceduralStatusService: CreateProceduralStatusInboundPort,
    @Inject(ListProceduralStatusInboundPortToken) private readonly listProceduralStatusService: ListProceduralStatusInboundPort,
    @Inject(PatchProceduralStatusInboundPortToken) private readonly patchProceduralStatusService: PatchProceduralStatusInboundPort,
    @Inject(DeleteProceduralStatusInboundPortToken) private readonly deleteProceduralStatusService: DeleteProceduralStatusInboundPort,
    @Inject(ListToSelectProceduralStatusInboundPortToken) private readonly listToSelectProceduralStatusService: ListToSelectProceduralStatusInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Practice-Area' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateProceduralStatusDto) {
    return this.createProceduralStatusService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Practice-Area List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListProceduralStatusDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listProceduralStatusService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Practice-Area' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchProceduralStatusDto) {
    return this.patchProceduralStatusService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Practice-Area' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteProceduralStatusService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Practice-Area List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectProceduralStatusDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectProceduralStatusService.execute(query)
  }
}
