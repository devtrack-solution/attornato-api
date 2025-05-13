import { Controller, Post, Body, Inject, Get, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { CreatePermissionInboundPort, CreatePermissionInboundPortToken } from '@/domain/todo/ports/inbound/permission/create-permission.inbound-port'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CreatePermissionDto } from '@/presentation/controllers/http/permission/dtos/create-permission.dto'
import { UpdatePermissionDto } from '@/presentation/controllers/http/permission/dtos/update-permission.dto'
import { ListToSelectPermissionInboundPort, ListToSelectPermissionInboundPortToken } from '@/domain/todo/ports/inbound/permission/list-to-select-permission.inbound-port'
import { ListToSelectPermissionDto } from '@/presentation/controllers/http/permission/dtos/list-to-select-permission.dto'
import { DeletePermissionInboundPort, DeletePermissionInboundPortToken } from '@/domain/todo/ports/inbound/permission/delete-permission.inbound-port'
import { PatchPermissionInboundPort, PatchPermissionInboundPortToken } from '@/domain/todo/ports/inbound/permission/patch-permission.inbound-port'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionHttpController extends BaseHttpController {
  constructor(
    @Inject(CreatePermissionInboundPortToken) private readonly createPermissionService: CreatePermissionInboundPort,
    @Inject(PatchPermissionInboundPortToken) private readonly patchPermissionService: PatchPermissionInboundPort,
    @Inject(DeletePermissionInboundPortToken) private readonly deletePermissionService: DeletePermissionInboundPort,
    @Inject(ListToSelectPermissionInboundPortToken) private readonly listToSelectPermissionService: ListToSelectPermissionInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new Permission' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreatePermissionDto) {
    return this.createPermissionService.execute(body)
  }
  /*
  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Permission List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.' })
  async find(@Body() body: any) {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Permission by Id' })
  @ApiResponse({ status: 200, description: 'The item has been found.' })
  async findById(@Param('id') id: string, @Body() body: any) {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Update a Permission' })
  @ApiResponse({ status: 200, description: 'The item has been updated.' })
  async update(@Param('id') id: string, @Body() body: UpdatePermissionDto) {
    throw new Error('Method not implemented.');
  }
*/
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a Permission' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: UpdatePermissionDto) {
    return this.patchPermissionService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a Permission' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deletePermissionService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List Permission List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.' })
  async findToSelect(@Query() query: ListToSelectPermissionDto) {
    return this.listToSelectPermissionService.execute(query)
  }
}
