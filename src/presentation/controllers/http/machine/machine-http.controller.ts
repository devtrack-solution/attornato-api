import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CreateMachineInboundPort, CreateMachineInboundPortToken } from '@/domain/machine/ports/inbound/create-machine.inbound-port'
import { PatchMachineInboundPort, PatchMachineInboundPortToken } from '@/domain/machine/ports/inbound/patch-machine.inbound-port'
import { DeleteMachineInboundPort, DeleteMachineInboundPortToken } from '@/domain/machine/ports/inbound/delete-machine.inbound-port'
import { ListToSelectMachineInboundPort, ListToSelectMachineInboundPortToken } from '@/domain/machine/ports/inbound/list-to-select-machine.inbound-port'
import { CreateMachineDto } from '@/presentation/controllers/http/machine/dtos/create-machine.dto'
import { PatchMachineDto } from '@/presentation/controllers/http/machine/dtos/patch-machine.dto'
import { ListToSelectMachineDto } from '@/presentation/controllers/http/machine/dtos/list-to-select-machine.dto'
import { ListMachineDto } from '@/presentation/controllers/http/machine/dtos/list-machine.dto'
import { ListMachineInboundPort, ListMachineInboundPortToken } from '@/domain/machine/ports/inbound/list-machine.inbound-port'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'

@ApiTags('Machines')
@Controller('machines')
export class MachineHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateMachineInboundPortToken) private readonly createMachineService: CreateMachineInboundPort,
    @Inject(ListMachineInboundPortToken) private readonly listMachineService: ListMachineInboundPort,
    @Inject(PatchMachineInboundPortToken) private readonly patchMachineService: PatchMachineInboundPort,
    @Inject(DeleteMachineInboundPortToken) private readonly deleteMachineService: DeleteMachineInboundPort,
    @Inject(ListToSelectMachineInboundPortToken) private readonly listToSelectMachineService: ListToSelectMachineInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Machine' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateMachineDto) {
    return this.createMachineService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Machine List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListMachineDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listMachineService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Machine' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchMachineDto) {
    return this.patchMachineService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Machine' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteMachineService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Machine List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectMachineDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectMachineService.execute(query)
  }
}
