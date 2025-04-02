import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateOriginDto } from './dtos/create-origin.dto'
import { ListOriginDto } from './dtos/list-origin.dto'
import { ListToSelectOriginDto } from './dtos/list-to-select-origin.dto'
import {
  PatchOriginInboundPort,
  PatchOriginInboundPortToken,
} from '@/domain/origin/ports/inbound/patch-origin.inbound-port'
import {
  CreateOriginInboundPort,
  CreateOriginInboundPortToken,
} from '@/domain/origin/ports/inbound/create-origin.inbound-port'
import {
  ListOriginInboundPort,
  ListOriginInboundPortToken,
} from '@/domain/origin/ports/inbound/list-origin.inbound-port'
import {
  DeleteOriginInboundPort,
  DeleteOriginInboundPortToken,
} from '@/domain/origin/ports/inbound/delete-origin.inbound-port'
import {
  ListToSelectOriginInboundPort,
  ListToSelectOriginInboundPortToken,
} from '@/domain/origin/ports/inbound/list-to-select-origin.inbound-port'
import { PatchOriginDto } from '@/presentation/controllers/http/origin/dtos/patch-origin.dto'

@ApiTags('Origin')
@Controller('origins')
export class OriginHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateOriginInboundPortToken) private readonly createOriginService: CreateOriginInboundPort,
    @Inject(ListOriginInboundPortToken) private readonly listOriginService: ListOriginInboundPort,
    @Inject(PatchOriginInboundPortToken) private readonly patchOriginService: PatchOriginInboundPort,
    @Inject(DeleteOriginInboundPortToken) private readonly deleteOriginService: DeleteOriginInboundPort,
    @Inject(ListToSelectOriginInboundPortToken) private readonly listToSelectOriginService: ListToSelectOriginInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Origin' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateOriginDto) {
    return this.createOriginService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Origin List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListOriginDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listOriginService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Origin' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchOriginDto) {
    return this.patchOriginService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Origin' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteOriginService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Origin List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectOriginDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectOriginService.execute(query)
  }
}
