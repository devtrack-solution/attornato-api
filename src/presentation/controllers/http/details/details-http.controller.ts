import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateDetailsDto } from './dtos/create-details.dto'
import { ListDetailsDto } from './dtos/list-details.dto'
import { ListToSelectDetailsDto } from './dtos/list-to-select-details.dto'
import {
  CreateDetailsInboundPort,
  CreateDetailsInboundPortToken,
} from '@/domain/details/ports/inbound/create-details-responsible.inbound-port'
import {
  ListDetailsInboundPort,
  ListDetailsInboundPortToken,
} from '@/domain/details/ports/inbound/list-details.inbound-port'
import {
  PatchDetailsInboundPort,
  PatchDetailsInboundPortToken,
} from '@/domain/details/ports/inbound/patch-details.inbound-port'
import {
  DeleteDetailsInboundPort,
  DeleteDetailsInboundPortToken,
} from '@/domain/details/ports/inbound/delete-details.inbound-port'
import {
  ListToSelectDetailsInboundPort,
  ListToSelectDetailsInboundPortToken,
} from '@/domain/details/ports/inbound/list-to-select-details.inbound-port'
import { PatchDetailsDto } from '@/presentation/controllers/http/details/dtos/patch-details.dto'

@ApiTags('Details')
@Controller('detailss')
export class DetailsHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateDetailsInboundPortToken) private readonly createDetailsService: CreateDetailsInboundPort,
    @Inject(ListDetailsInboundPortToken) private readonly listDetailsService: ListDetailsInboundPort,
    @Inject(PatchDetailsInboundPortToken) private readonly patchDetailsService: PatchDetailsInboundPort,
    @Inject(DeleteDetailsInboundPortToken) private readonly deleteDetailsService: DeleteDetailsInboundPort,
    @Inject(ListToSelectDetailsInboundPortToken) private readonly listToSelectDetailsService: ListToSelectDetailsInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Group-Process' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateDetailsDto) {
    return this.createDetailsService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Group-Process List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListDetailsDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listDetailsService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Group-Process' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchDetailsDto) {
    return this.patchDetailsService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Group-Process' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteDetailsService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Group-Process List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectDetailsDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectDetailsService.execute(query)
  }
}
