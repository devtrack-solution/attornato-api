import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreatePhaseInboundPortToken, CreatePhaseInboundPort } from '@/domain/process/component/phase/ports/inbound/create-phase-responsible.inbound-port'
import { DeletePhaseInboundPortToken, DeletePhaseInboundPort } from '@/domain/process/component/phase/ports/inbound/delete-phase.inbound-port'
import { ListPhaseInboundPortToken, ListPhaseInboundPort } from '@/domain/process/component/phase/ports/inbound/list-phase.inbound-port'
import { ListToSelectPhaseInboundPortToken, ListToSelectPhaseInboundPort } from '@/domain/process/component/phase/ports/inbound/list-to-select-phase.inbound-port'
import { PatchPhaseInboundPortToken, PatchPhaseInboundPort } from '@/domain/process/component/phase/ports/inbound/patch-phase.inbound-port'
import { CreatePhaseDto } from './dtos/create-phase.dto'
import { ListPhaseDto } from './dtos/list-phase.dto'
import { ListToSelectPhaseDto } from './dtos/list-to-select-phase.dto'
import { PatchPhaseDto } from '@/presentation/controllers/http/process/component/phase/dtos/patch-phase.dto'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'

@ApiTags('Process')
@Controller('process/phases')
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
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new Phase' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreatePhaseDto) {
    return this.createPhaseService.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Phase List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListPhaseDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listPhaseService.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a Phase' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchPhaseDto) {
    return this.patchPhaseService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a Phase' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deletePhaseService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List Phase List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectPhaseDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectPhaseService.execute(query)
  }
}
