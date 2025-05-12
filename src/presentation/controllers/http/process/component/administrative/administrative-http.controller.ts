import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateAdministrativeInboundPortToken, CreateAdministrativeInboundPort } from '@/domain/process/component/administrative/ports/inbound/create-administrative-responsible.inbound-port'
import { DeleteAdministrativeInboundPortToken, DeleteAdministrativeInboundPort } from '@/domain/process/component/administrative/ports/inbound/delete-administrative.inbound-port'
import { ListAdministrativeInboundPortToken, ListAdministrativeInboundPort } from '@/domain/process/component/administrative/ports/inbound/list-administrative.inbound-port'
import { ListToSelectAdministrativeInboundPortToken, ListToSelectAdministrativeInboundPort } from '@/domain/process/component/administrative/ports/inbound/list-to-select-administrative.inbound-port'
import { PatchAdministrativeInboundPortToken, PatchAdministrativeInboundPort } from '@/domain/process/component/administrative/ports/inbound/patch-administrative.inbound-port'
import { CreateAdministrativeDto } from './dtos/create-administrative.dto'
import { ListAdministrativeDto } from './dtos/list-administrative.dto'
import { ListToSelectAdministrativeDto } from './dtos/list-to-select-administrative.dto'
import { PatchAdministrativeDto } from '@/presentation/controllers/http/process/component/administrative/dtos/patch-administrative.dto'

import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/infrastructure/adapters/http/auth/roles'
import { Permissions } from '@/infrastructure/adapters/http/auth/permission.decorator'

@ApiTags('Process')
@Controller('process/administrative')
export class AdministrativeHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateAdministrativeInboundPortToken) private readonly createAdministrativeService: CreateAdministrativeInboundPort,
    @Inject(ListAdministrativeInboundPortToken) private readonly listAdministrativeService: ListAdministrativeInboundPort,
    @Inject(PatchAdministrativeInboundPortToken) private readonly patchAdministrativeService: PatchAdministrativeInboundPort,
    @Inject(DeleteAdministrativeInboundPortToken) private readonly deleteAdministrativeService: DeleteAdministrativeInboundPort,
    @Inject(ListToSelectAdministrativeInboundPortToken) private readonly listToSelectAdministrativeService: ListToSelectAdministrativeInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new Administrative' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateAdministrativeDto) {
    return this.createAdministrativeService.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Administrative List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListAdministrativeDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listAdministrativeService.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a Administrative' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchAdministrativeDto) {
    return this.patchAdministrativeService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a Administrative' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteAdministrativeService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List Administrative List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectAdministrativeDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectAdministrativeService.execute(query)
  }
}
