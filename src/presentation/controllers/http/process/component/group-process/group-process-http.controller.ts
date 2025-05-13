import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CreateGroupProcessInboundPort, CreateGroupProcessInboundPortToken } from '@/domain/process/component/group-process/ports/inbound/create-group-process.inbound-port'
import { PatchGroupProcessInboundPort, PatchGroupProcessInboundPortToken } from '@/domain/process/component/group-process/ports/inbound/patch-group-process.inbound-port'
import { DeleteGroupProcessInboundPort, DeleteGroupProcessInboundPortToken } from '@/domain/process/component/group-process/ports/inbound/delete-group-process.inbound-port'
import { ListToSelectGroupProcessInboundPort, ListToSelectGroupProcessInboundPortToken } from '@/domain/process/component/group-process/ports/inbound/list-to-select-group-process.inbound-port'
import { CreateGroupProcessDto } from '@/presentation/controllers/http/process/component/group-process/dtos/create-group-process.dto'
import { PatchGroupProcessDto } from '@/presentation/controllers/http/process/component/group-process/dtos/patch-group-process.dto'
import { ListToSelectGroupProcessDto } from '@/presentation/controllers/http/process/component/group-process/dtos/list-to-select-group-process.dto'
import { ListGroupProcessDto } from '@/presentation/controllers/http/process/component/group-process/dtos/list-group-process.dto'
import { ListGroupProcessInboundPort, ListGroupProcessInboundPortToken } from '@/domain/process/component/group-process/ports/inbound/list-group-process.inbound-port'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'
import { RolesGuard } from '@/commons/guard/roles.guard'

@ApiTags('Process')
@Controller('process/group-process')
export class GroupProcessHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateGroupProcessInboundPortToken) private readonly createGroupProcessService: CreateGroupProcessInboundPort,
    @Inject(ListGroupProcessInboundPortToken) private readonly listGroupProcessService: ListGroupProcessInboundPort,
    @Inject(PatchGroupProcessInboundPortToken) private readonly patchGroupProcessService: PatchGroupProcessInboundPort,
    @Inject(DeleteGroupProcessInboundPortToken) private readonly deleteGroupProcessService: DeleteGroupProcessInboundPort,
    @Inject(ListToSelectGroupProcessInboundPortToken) private readonly listToSelectGroupProcessService: ListToSelectGroupProcessInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new Group-Process' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateGroupProcessDto) {
    return this.createGroupProcessService.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Group-Process List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListGroupProcessDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listGroupProcessService.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a Group-Process' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchGroupProcessDto) {
    return this.patchGroupProcessService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a Group-Process' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteGroupProcessService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List Group-Process List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectGroupProcessDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectGroupProcessService.execute(query)
  }
}
