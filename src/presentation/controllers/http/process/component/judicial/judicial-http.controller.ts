import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateJudicialInboundPortToken, CreateJudicialInboundPort } from '@/domain/process/component/judicial/ports/inbound/create-judicial.inbound-port'
import { DeleteJudicialInboundPortToken, DeleteJudicialInboundPort } from '@/domain/process/component/judicial/ports/inbound/delete-judicial.inbound-port'
import { ListJudicialInboundPortToken, ListJudicialInboundPort } from '@/domain/process/component/judicial/ports/inbound/list-judicial.inbound-port'
import { ListToSelectJudicialInboundPortToken, ListToSelectJudicialInboundPort } from '@/domain/process/component/judicial/ports/inbound/list-to-select-judicial.inbound-port'
import { PatchJudicialInboundPortToken, PatchJudicialInboundPort } from '@/domain/process/component/judicial/ports/inbound/patch-judicial.inbound-port'
import { CreateJudicialDto } from './dtos/create-judicial.dto'
import { ListJudicialDto } from './dtos/list-judicial.dto'
import { ListToSelectJudicialDto } from './dtos/list-to-select-judicial.dto'
import { PatchJudicialDto } from '@/presentation/controllers/http/process/component/judicial/dtos/patch-judicial.dto'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'

@ApiTags('Process')
@Controller('process/judicials')
export class JudicialHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateJudicialInboundPortToken) private readonly createJudicialService: CreateJudicialInboundPort,
    @Inject(ListJudicialInboundPortToken) private readonly listJudicialService: ListJudicialInboundPort,
    @Inject(PatchJudicialInboundPortToken) private readonly patchJudicialService: PatchJudicialInboundPort,
    @Inject(DeleteJudicialInboundPortToken) private readonly deleteJudicialService: DeleteJudicialInboundPort,
    @Inject(ListToSelectJudicialInboundPortToken) private readonly listToSelectJudicialService: ListToSelectJudicialInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new Judicial' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateJudicialDto) {
    return this.createJudicialService.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Judicial List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListJudicialDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listJudicialService.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a Judicial' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchJudicialDto) {
    return this.patchJudicialService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a Judicial' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteJudicialService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List Judicial List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectJudicialDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectJudicialService.execute(query)
  }
}
