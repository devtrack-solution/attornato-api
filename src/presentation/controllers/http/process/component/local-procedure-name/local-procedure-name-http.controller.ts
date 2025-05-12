import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateLocalProcedureNameDto } from './dtos/create-local-procedure-name].dto'
import { ListLocalProcedureNameDto } from './dtos/list-local-procedure.name.dto'
import { ListToSelectLocalProcedureNameDto } from './dtos/list-to-select-local-procedure-name.dto'
import { PatchLocalProcedureNameDto } from './dtos/patch-local-procedure-name.dto'
import { CreateLocalProcedureNameInboundPort, CreateLocalProcedureNameInboundPortToken } from '@/domain/process/component/local-procedure-name/ports/inbound/create-local-procedure-name.inbound-port'
import { ListLocalProcedureNameInboundPort, ListLocalProcedureNameInboundPortToken } from '@/domain/process/component/local-procedure-name/ports/inbound/list-local-procedure-name.inbound-port'
import { PatchLocalProcedureNameInboundPort, PatchLocalProcedureNameInboundPortToken } from '@/domain/process/component/local-procedure-name/ports/inbound/patch-local-procedure-name.inbound-port'
import { DeleteLocalProcedureNameInboundPort, DeleteLocalProcedureNameInboundPortToken } from '@/domain/process/component/local-procedure-name/ports/inbound/delete-local-procedure.name.inbound-port'
import {
  ListToSelectLocalProcedureNameInboundPort,
  ListToSelectLocalProcedureNameInboundPortToken,
} from '@/domain/process/component/local-procedure-name/ports/inbound/list-to-select-local-procedure-name.inbound-port'
import { RolesGuard } from '@/commons/guard/roles.guard'

@ApiTags('Process')
@Controller('process/local-procedure-names')
export class LocalProcedureNameHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateLocalProcedureNameInboundPortToken) private readonly createLocalProcedureNameService: CreateLocalProcedureNameInboundPort,
    @Inject(ListLocalProcedureNameInboundPortToken) private readonly listLocalProcedureNameService: ListLocalProcedureNameInboundPort,
    @Inject(PatchLocalProcedureNameInboundPortToken) private readonly patchLocalProcedureNameService: PatchLocalProcedureNameInboundPort,
    @Inject(DeleteLocalProcedureNameInboundPortToken) private readonly deleteLocalProcedureNameService: DeleteLocalProcedureNameInboundPort,
    @Inject(ListToSelectLocalProcedureNameInboundPortToken) private readonly listToSelectLocalProcedureNameService: ListToSelectLocalProcedureNameInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new Local-Procedure-Name' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateLocalProcedureNameDto) {
    return this.createLocalProcedureNameService.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Find a Local-Procedure-Name List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListLocalProcedureNameDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listLocalProcedureNameService.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Patch a Local-Procedure-Name' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchLocalProcedureNameDto) {
    return this.patchLocalProcedureNameService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete a Local-Procedure-Name' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteLocalProcedureNameService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'List Local-Procedure-Name List to select' })
  @ApiResponse({
    status: 200,
    description: 'The item has been listed to select.',
    type: ListToSelectLocalProcedureNameDto,
  })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectLocalProcedureNameService.execute(query)
  }
}
