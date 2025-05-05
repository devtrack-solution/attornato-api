import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateIndividualInboundPortToken, CreateIndividualInboundPort } from '@/domain/client/component/individual/ports/inbound/create-individual.inbound-port'
import { DeleteIndividualInboundPortToken, DeleteIndividualInboundPort } from '@/domain/client/component/individual/ports/inbound/delete-individual.inbound-port'
import { ListIndividualInboundPortToken, ListIndividualInboundPort } from '@/domain/client/component/individual/ports/inbound/list-individual.inbound-port'
import { ListToSelectIndividualInboundPortToken, ListToSelectIndividualInboundPort } from '@/domain/client/component/individual/ports/inbound/list-to-select-individual.inbound-port'
import { PatchIndividualInboundPortToken, PatchIndividualInboundPort } from '@/domain/client/component/individual/ports/inbound/patch-individual.inbound-port'
import { CreateIndividualDto } from './dtos/create-individual.dto'
import { ListIndividualDto } from './dtos/list-individual.dto'
import { ListToSelectIndividualDto } from './dtos/list-to-select-individual.dto'
import { PatchIndividualDto } from './dtos/patch-individual.dto'

@ApiTags('Clients')
@Controller('clients/individual')
export class IndividualHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateIndividualInboundPortToken) private readonly createIndividualService: CreateIndividualInboundPort,
    @Inject(ListIndividualInboundPortToken) private readonly listIndividualService: ListIndividualInboundPort,
    @Inject(PatchIndividualInboundPortToken) private readonly patchIndividualService: PatchIndividualInboundPort,
    @Inject(DeleteIndividualInboundPortToken) private readonly deleteIndividualService: DeleteIndividualInboundPort,
    @Inject(ListToSelectIndividualInboundPortToken) private readonly listToSelectIndividualService: ListToSelectIndividualInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Individual' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateIndividualDto) {
    return this.createIndividualService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Individual List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListIndividualDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listIndividualService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Individual' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchIndividualDto) {
    return this.patchIndividualService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Individual' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteIndividualService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Individual List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectIndividualDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectIndividualService.execute(query)
  }
}
