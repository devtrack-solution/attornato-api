import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateCountyInboundPortToken, CreateCountyInboundPort } from '@/domain/process/component/county/ports/inbound/create-county.inbound-port'
import { DeleteCountyInboundPortToken, DeleteCountyInboundPort } from '@/domain/process/component/county/ports/inbound/delete-county.inbound-port'
import { ListCountyInboundPortToken, ListCountyInboundPort } from '@/domain/process/component/county/ports/inbound/list-county.inbound-port'
import { ListToSelectCountyInboundPortToken, ListToSelectCountyInboundPort } from '@/domain/process/component/county/ports/inbound/list-to-select-county.inbound-port'
import { PatchCountyInboundPortToken, PatchCountyInboundPort } from '@/domain/process/component/county/ports/inbound/patch-county.inbound-port'
import { CreateCountyDto } from './dtos/create-county.dto'
import { ListCountyDto } from './dtos/list-county.dto'
import { ListToSelectCountyDto } from './dtos/list-to-select-county.dto'
import { PatchCountyDto } from './dtos/patch-county.dto'
import { RolesGuard } from '@/commons/guard/roles.guard'

@ApiTags('Process')
@Controller('process/counties')
export class CountyHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateCountyInboundPortToken) private readonly createCountyService: CreateCountyInboundPort,
    @Inject(ListCountyInboundPortToken) private readonly listCountyService: ListCountyInboundPort,
    @Inject(PatchCountyInboundPortToken) private readonly patchCountyService: PatchCountyInboundPort,
    @Inject(DeleteCountyInboundPortToken) private readonly deleteCountyService: DeleteCountyInboundPort,
    @Inject(ListToSelectCountyInboundPortToken) private readonly listToSelectCountyService: ListToSelectCountyInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new County' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateCountyDto) {
    return this.createCountyService.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Find a County List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListCountyDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listCountyService.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Patch a County' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchCountyDto) {
    return this.patchCountyService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete a County' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteCountyService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'List County List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectCountyDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectCountyService.execute(query)
  }
}
