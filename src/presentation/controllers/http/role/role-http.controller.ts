import { Controller, Post, Body, Inject, Get, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateRoleDto } from '@/presentation/controllers/http/role/dtos/create-role.dto'
import { ListRoleDto } from '@/presentation/controllers/http/role/dtos/list-role.dto'
import { PatchRoleDto } from '@/presentation/controllers/http/role/dtos/patch-role.dto'
import { ListToSelectRoleDto } from '@/presentation/controllers/http/role/dtos/list-to-select-role.dto'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'
import { CreateRoleInboundPort, CreateRoleInboundPortToken } from '@/domain/securities/ports/inbound/component/role/create-role.inbound-port'
import { ListRoleInboundPort, ListRoleInboundPortToken } from '@/domain/securities/ports/inbound/component/role/list-role.inbound-port'
import { PatchRoleInboundPort, PatchRoleInboundPortToken } from '@/domain/securities/ports/inbound/component/role/patch-role.inbound-port'
import { DeleteRoleInboundPort, DeleteRoleInboundPortToken } from '@/domain/securities/ports/inbound/component/role/delete-role.inbound-port'
import { ListToSelectRoleInboundPort, ListToSelectRoleInboundPortToken } from '@/domain/securities/ports/inbound/component/role/list-to-select-role.inbound-port'

@ApiTags('Roles')
@Controller('roles')
export class RoleHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateRoleInboundPortToken) private readonly createRoleService: CreateRoleInboundPort,
    @Inject(ListRoleInboundPortToken) private readonly listRoleService: ListRoleInboundPort,
    @Inject(PatchRoleInboundPortToken) private readonly patchRoleService: PatchRoleInboundPort,
    @Inject(DeleteRoleInboundPortToken) private readonly deleteRoleService: DeleteRoleInboundPort,
    @Inject(ListToSelectRoleInboundPortToken) private readonly listToSelectRoleService: ListToSelectRoleInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new Role' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateRoleDto) {
    return this.createRoleService.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Role List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListRoleDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listRoleService.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a Role' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchRoleDto) {
    return this.patchRoleService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a Role' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteRoleService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List Role List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectRoleDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectRoleService.execute(query)
  }
}
