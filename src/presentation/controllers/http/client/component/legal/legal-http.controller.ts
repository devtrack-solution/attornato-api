import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateLegalInboundPortToken, CreateLegalInboundPort } from '@/domain/client/component/legal/ports/inbound/create-legal.inbound-port'
import { DeleteLegalInboundPortToken, DeleteLegalInboundPort } from '@/domain/client/component/legal/ports/inbound/delete-legal.inbound-port'
import { ListLegalInboundPortToken, ListLegalInboundPort } from '@/domain/client/component/legal/ports/inbound/list-legal.inbound-port'
import { ListToSelectLegalInboundPortToken, ListToSelectLegalInboundPort } from '@/domain/client/component/legal/ports/inbound/list-to-select-legal.inbound-port'
import { PatchLegalInboundPortToken, PatchLegalInboundPort } from '@/domain/client/component/legal/ports/inbound/patch-legal.inbound-port'
import { CreateLegalDto } from './dtos/create-legal.dto'
import { ListLegalDto } from './dtos/list-legal.dto'
import { ListToSelectLegalDto } from './dtos/list-to-select-legal.dto'
import { PatchLegalDto } from './dtos/patch-legal.dto'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'

@ApiTags('Clients')
@Controller('clients/legal')
export class LegalHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateLegalInboundPortToken) private readonly createLegalService: CreateLegalInboundPort,
    @Inject(ListLegalInboundPortToken) private readonly listLegalService: ListLegalInboundPort,
    @Inject(PatchLegalInboundPortToken) private readonly patchLegalService: PatchLegalInboundPort,
    @Inject(DeleteLegalInboundPortToken) private readonly deleteLegalService: DeleteLegalInboundPort,
    @Inject(ListToSelectLegalInboundPortToken) private readonly listToSelectLegalService: ListToSelectLegalInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new Legal' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateLegalDto) {
    return this.createLegalService.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Legal List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListLegalDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listLegalService.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a Legal' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchLegalDto) {
    return this.patchLegalService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a Legal' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteLegalService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List Legal List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectLegalDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectLegalService.execute(query)
  }
}
