import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateLocalProcedureNameDto } from './dtos/create-local-procedure-name].dto'
import { ListLocalProcedureNameDto } from './dtos/list-local-procedure.name.dto'
import { ListToSelectLocalProcedureNameDto } from './dtos/list-to-select-local-procedure-name.dto'
import { PatchLocalProcedureNameDto } from './dtos/patch-local-procedure-name.dto'
import {
  CreateLocalProcedureNameInboundPort,
  CreateLocalProcedureNameInboundPortToken,
} from '@/domain/local-procedure-name/ports/inbound/create-local-procedure-name.inbound-port'
import {
  ListLocalProcedureNameInboundPort,
  ListLocalProcedureNameInboundPortToken,
} from '@/domain/local-procedure-name/ports/inbound/list-local-procedure-name.inbound-port'
import {
  PatchLocalProcedureNameInboundPort,
  PatchLocalProcedureNameInboundPortToken,
} from '@/domain/local-procedure-name/ports/inbound/patch-local-procedure-name.inbound-port'
import {
  DeleteLocalProcedureNameInboundPort,
  DeleteLocalProcedureNameInboundPortToken,
} from '@/domain/local-procedure-name/ports/inbound/delete-local-procedure.name.inbound-port'
import {
  ListToSelectLocalProcedureNameInboundPort,
  ListToSelectLocalProcedureNameInboundPortToken,
} from '@/domain/local-procedure-name/ports/inbound/list-to-select-local-procedure-name.inbound-port'

@ApiTags('Local-Procedure-Name')
@Controller('local-procedure-names')
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
  @ApiOperation({ summary: 'Create a new Group-Process' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateLocalProcedureNameDto) {
    return this.createLocalProcedureNameService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Group-Process List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListLocalProcedureNameDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listLocalProcedureNameService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Group-Process' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchLocalProcedureNameDto) {
    return this.patchLocalProcedureNameService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Group-Process' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteLocalProcedureNameService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Group-Process List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectLocalProcedureNameDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectLocalProcedureNameService.execute(query)
  }
}
