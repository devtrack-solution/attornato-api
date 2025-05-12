import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CreateActionObjectInboundPort, CreateActionObjectInboundPortToken } from '@/domain/process/component/action-object/ports/inbound/create-action-object.inbound-port'
import { ListActionObjectInboundPort, ListActionObjectInboundPortToken } from '@/domain/process/component/action-object/ports/inbound/list-action-object.inbound-port'
import { PatchActionObjectInboundPort, PatchActionObjectInboundPortToken } from '@/domain/process/component/action-object/ports/inbound/patch-action-object.inbound-port'
import { DeleteActionObjectInboundPort, DeleteActionObjectInboundPortToken } from '@/domain/process/component/action-object/ports/inbound/delete-action-object.inbound-port'
import { ListToSelectActionObjectInboundPort, ListToSelectActionObjectInboundPortToken } from '@/domain/process/component/action-object/ports/inbound/list-to-select-action-object.inbound-port'
import { CreateActionObjectDto } from '@/presentation/controllers/http/process/component/action-object/dtos/create-action-object.dto'
import { ListActionObjectDto } from '@/presentation/controllers/http/process/component/action-object/dtos/list-action-object.dto'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { PatchActionObjectDto } from '@/presentation/controllers/http/process/component/action-object/dtos/patch-action-object.dto'
import { ListToSelectActionObjectDto } from '@/presentation/controllers/http/process/component/action-object/dtos/list-to-select-action-object.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { RolesGuard } from '@/commons/guard/roles.guard'

@ApiTags('Process')
@Controller('process/action-objects')
export class ActionObjectHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateActionObjectInboundPortToken) private readonly createActionObjectService: CreateActionObjectInboundPort,
    @Inject(ListActionObjectInboundPortToken) private readonly listActionObjectService: ListActionObjectInboundPort,
    @Inject(PatchActionObjectInboundPortToken) private readonly patchActionObjectService: PatchActionObjectInboundPort,
    @Inject(DeleteActionObjectInboundPortToken) private readonly deleteActionObjectService: DeleteActionObjectInboundPort,
    @Inject(ListToSelectActionObjectInboundPortToken) private readonly listToSelectActionObjectService: ListToSelectActionObjectInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new Action-Object' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateActionObjectDto) {
    return this.createActionObjectService.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Find a Action-Object List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListActionObjectDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listActionObjectService.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Patch a Action-Object' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchActionObjectDto) {
    return this.patchActionObjectService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete a Action-Object' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteActionObjectService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'List Action-Object List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectActionObjectDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectActionObjectService.execute(query)
  }
}
