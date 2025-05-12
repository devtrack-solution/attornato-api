import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateResponsibleInboundPortToken, CreateResponsibleInboundPort } from '@/domain/process/component/responsible/ports/inbound/create-responsible.inbound-port'
import { DeleteResponsibleInboundPortToken, DeleteResponsibleInboundPort } from '@/domain/process/component/responsible/ports/inbound/delete-responsible.inbound-port'
import { ListResponsibleInboundPortToken, ListResponsibleInboundPort } from '@/domain/process/component/responsible/ports/inbound/list-responsible.inbound-port'
import { ListToSelectResponsibleInboundPortToken, ListToSelectResponsibleInboundPort } from '@/domain/process/component/responsible/ports/inbound/list-to-select-responsible.inbound-port'
import { PatchResponsibleInboundPortToken, PatchResponsibleInboundPort } from '@/domain/process/component/responsible/ports/inbound/patch-responsible.inbound-port'
import { CreateResponsibleDto } from './dtos/create-responsible.dto'
import { ListResponsibleDto } from './dtos/list-responsible.dto'
import { ListToSelectResponsibleDto } from './dtos/list-to-select-responsible.dto'
import { PatchResponsibleDto } from './dtos/patch-responsible.dto'

import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/infrastructure/adapters/http/auth/roles'
import { Permissions } from '@/infrastructure/adapters/http/auth/permission.decorator'

@ApiTags('Process')
@Controller('process/responsible')
export class ResponsibleHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateResponsibleInboundPortToken) private readonly createResponsibleService: CreateResponsibleInboundPort,
    @Inject(ListResponsibleInboundPortToken) private readonly listResponsibleService: ListResponsibleInboundPort,
    @Inject(PatchResponsibleInboundPortToken) private readonly patchResponsibleService: PatchResponsibleInboundPort,
    @Inject(DeleteResponsibleInboundPortToken) private readonly deleteResponsibleService: DeleteResponsibleInboundPort,
    @Inject(ListToSelectResponsibleInboundPortToken) private readonly listToSelectResponsibleService: ListToSelectResponsibleInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new Responsible' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateResponsibleDto) {
    return this.createResponsibleService.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Responsible List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListResponsibleDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listResponsibleService.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a Responsible' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchResponsibleDto) {
    return this.patchResponsibleService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a Responsible' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteResponsibleService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List Responsible List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectResponsibleDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectResponsibleService.execute(query)
  }
}
