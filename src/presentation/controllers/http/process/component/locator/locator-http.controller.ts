import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateLocatorInboundPortToken, CreateLocatorInboundPort } from '@/domain/process/component/locator/ports/inbound/create-locator.inbound-port'
import { DeleteLocatorInboundPortToken, DeleteLocatorInboundPort } from '@/domain/process/component/locator/ports/inbound/delete-locator.inbound-port'
import { ListLocatorInboundPortToken, ListLocatorInboundPort } from '@/domain/process/component/locator/ports/inbound/list-locator.inbound-port'
import { ListToSelectLocatorInboundPortToken, ListToSelectLocatorInboundPort } from '@/domain/process/component/locator/ports/inbound/list-to-select-locator.inbound-port'
import { PatchLocatorInboundPortToken, PatchLocatorInboundPort } from '@/domain/process/component/locator/ports/inbound/patch-locator.inbound-port'
import { CreateLocatorDto } from './dtos/create-locator.dto'
import { ListLocatorDto } from './dtos/list-locator.dto'
import { ListToSelectLocatorDto } from './dtos/list-to-select-locator.dto'
import { PatchLocatorDto } from './dtos/patch-locator.dto'

@ApiTags('Process')
@Controller('process/locators')
export class LocatorHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateLocatorInboundPortToken) private readonly createLocatorService: CreateLocatorInboundPort,
    @Inject(ListLocatorInboundPortToken) private readonly listLocatorService: ListLocatorInboundPort,
    @Inject(PatchLocatorInboundPortToken) private readonly patchLocatorService: PatchLocatorInboundPort,
    @Inject(DeleteLocatorInboundPortToken) private readonly deleteLocatorService: DeleteLocatorInboundPort,
    @Inject(ListToSelectLocatorInboundPortToken) private readonly listToSelectLocatorService: ListToSelectLocatorInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Locator' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateLocatorDto) {
    return this.createLocatorService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Locator List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListLocatorDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listLocatorService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Locator' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchLocatorDto) {
    return this.patchLocatorService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Locator' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteLocatorService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Locator List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectLocatorDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectLocatorService.execute(query)
  }
}
