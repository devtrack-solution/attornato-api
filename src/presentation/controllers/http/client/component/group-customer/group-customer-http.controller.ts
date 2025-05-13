import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CreateGroupCustomerInboundPort, CreateGroupCustomerInboundPortToken } from '@/domain/client/component/group-customer/ports/inbound/create-group-customer.inbound-port'
import { PatchGroupCustomerInboundPort, PatchGroupCustomerInboundPortToken } from '@/domain/client/component/group-customer/ports/inbound/patch-group-customer.inbound-port'
import { DeleteGroupCustomerInboundPort, DeleteGroupCustomerInboundPortToken } from '@/domain/client/component/group-customer/ports/inbound/delete-group-customer.inbound-port'
import { ListToSelectGroupCustomerInboundPort, ListToSelectGroupCustomerInboundPortToken } from '@/domain/client/component/group-customer/ports/inbound/list-to-select-group-customer.inbound-port'
import { ListGroupCustomerInboundPort, ListGroupCustomerInboundPortToken } from '@/domain/client/component/group-customer/ports/inbound/list-group-customer.inbound-port'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateGroupCustomerDto } from '@/presentation/controllers/http/client/component/group-customer/dtos/create-group-customer.dto'
import { ListGroupCustomerDto } from '@/presentation/controllers/http/client/component/group-customer/dtos/list-group-customer.dto'
import { PatchGroupCustomerDto } from '@/presentation/controllers/http/client/component/group-customer/dtos/patch-group-customer.dto'
import { ListToSelectGroupCustomerDto } from '@/presentation/controllers/http/client/component/group-customer/dtos/list-to-select-group-customer.dto'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'

@ApiTags('Clients')
@Controller('clients/group-customer')
export class GroupCustomerHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateGroupCustomerInboundPortToken) private readonly createGroupCustomerService: CreateGroupCustomerInboundPort,
    @Inject(ListGroupCustomerInboundPortToken) private readonly listGroupCustomerService: ListGroupCustomerInboundPort,
    @Inject(PatchGroupCustomerInboundPortToken) private readonly patchGroupCustomerService: PatchGroupCustomerInboundPort,
    @Inject(DeleteGroupCustomerInboundPortToken) private readonly deleteGroupCustomerService: DeleteGroupCustomerInboundPort,
    @Inject(ListToSelectGroupCustomerInboundPortToken) private readonly listToSelectGroupCustomerService: ListToSelectGroupCustomerInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new Group-Customer' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateGroupCustomerDto) {
    return this.createGroupCustomerService.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Group-Customer List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListGroupCustomerDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listGroupCustomerService.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a Group-Customer' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchGroupCustomerDto) {
    return this.patchGroupCustomerService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a Group-Customer' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteGroupCustomerService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List Group-Customer List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectGroupCustomerDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectGroupCustomerService.execute(query)
  }
}
