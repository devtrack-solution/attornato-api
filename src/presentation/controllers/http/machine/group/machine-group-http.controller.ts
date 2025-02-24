import { Controller, Post, Body, Inject, Get, Patch, Param, Delete, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { PatchMachineGroupInboundPort, PatchMachineGroupInboundPortToken } from '@/domain/machine/group/ports/inbound/patch-machine-group.inbound-port'
import { DeleteMachineGroupInboundPort, DeleteMachineGroupInboundPortToken } from '@/domain/machine/group/ports/inbound/delete-machine-group.inbound-port'
import { ListToSelectMachineGroupInboundPort, ListToSelectMachineGroupInboundPortToken } from '@/domain/machine/group/ports/inbound/list-to-select-machine-group.inbound-port'
import { ListMachineGroupInboundPort, ListMachineGroupInboundPortToken } from '@/domain/machine/group/ports/inbound/list-machine-group.inbound-port'
import { CreateMachineGroupDto } from '@/presentation/controllers/http/machine/group/dtos/create-machine-group.dto'
import { ListMachineGroupDto } from '@/presentation/controllers/http/machine/group/dtos/list-machine-group.dto'
import { PatchMachineGroupDto } from '@/presentation/controllers/http/machine/group/dtos/patch-machine-group.dto'
import { ListToSelectMachineGroupDto } from '@/presentation/controllers/http/machine/group/dtos/list-to-select-machine-group.dto'
import { CreateMachineGroupInboundPort, CreateMachineGroupInboundPortToken } from '@/domain/machine/group/ports/inbound/create-machine-group.inbound-port'
import { MachineGroupDto } from '@/presentation/controllers/http/machine/group/dtos/machine-group.dto'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'

@ApiTags('Machine Groups')
@Controller('machines/groups')
export class MachineGroupHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateMachineGroupInboundPortToken) private readonly createMachineGroupService: CreateMachineGroupInboundPort,
    @Inject(ListMachineGroupInboundPortToken) private readonly listMachineGroupService: ListMachineGroupInboundPort,
    @Inject(PatchMachineGroupInboundPortToken) private readonly patchMachineGroupService: PatchMachineGroupInboundPort,
    @Inject(DeleteMachineGroupInboundPortToken) private readonly deleteMachineGroupService: DeleteMachineGroupInboundPort,
    @Inject(ListToSelectMachineGroupInboundPortToken) private readonly listToSelectMachineGroupService: ListToSelectMachineGroupInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Machine Group' })
  @ApiResponse({ status: 201, description: 'The Machine Group has been created.' })
  @ApiCreatedResponse({
    description: 'The machine has been successfully created.',
    type: MachineGroupDto,
  })
  /*  @ApiBadRequestResponse({
    description: "The input is invalid",
    type: ValidationErrorResponse
  })*/
  async create(@Body() body: CreateMachineGroupDto) {
    return this.createMachineGroupService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Machine Group List' })
  @ApiResponse({ status: 200, description: 'The Machine Groups have been listed.' })
  async find(@Query() query: ListMachineGroupDto) {
    return this.listMachineGroupService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Machine Group' })
  @ApiResponse({ status: 200, description: 'The Machine Group has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchMachineGroupDto) {
    return this.patchMachineGroupService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Machine Group' })
  @ApiResponse({ status: 200, description: 'The Machine Group has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteMachineGroupService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Machine Groups for selection' })
  @ApiResponse({ status: 200, description: 'The Machine Groups have been listed for selection.' })
  async findToSelect(@Query() query: ListToSelectMachineGroupDto) {
    return this.listToSelectMachineGroupService.execute(query)
  }
}
