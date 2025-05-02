import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CreatePartnerInboundPort, CreatePartnerInboundPortToken } from '@/domain/process/component/partner/ports/inbound/create-partner.inbound-port'
import { PatchPartnerInboundPort, PatchPartnerInboundPortToken } from '@/domain/process/component/partner/ports/inbound/patch-partner.inbound-port'
import { DeletePartnerInboundPort, DeletePartnerInboundPortToken } from '@/domain/process/component/partner/ports/inbound/delete-partner.inbound-port'
import { ListToSelectPartnerInboundPort, ListToSelectPartnerInboundPortToken } from '@/domain/process/component/partner/ports/inbound/list-to-select-partner.inbound-port'
import { CreatePartnerDto } from '@/presentation/controllers/http/process/component/partner/dtos/create-partner.dto'
import { PatchPartnerDto } from '@/presentation/controllers/http/process/component/partner/dtos/patch-partner.dto'
import { ListToSelectPartnerDto } from '@/presentation/controllers/http/process/component/partner/dtos/list-to-select-partner.dto'
import { ListPartnerDto } from '@/presentation/controllers/http/process/component/partner/dtos/list-partner.dto'
import { ListPartnerInboundPort, ListPartnerInboundPortToken } from '@/domain/process/component/partner/ports/inbound/list-partner.inbound-port'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'

@ApiTags('Process')
@Controller('process/partner')
export class PartnerHttpController extends BaseHttpController {
  constructor(
    @Inject(CreatePartnerInboundPortToken) private readonly createPartnerService: CreatePartnerInboundPort,
    @Inject(ListPartnerInboundPortToken) private readonly listPartnerService: ListPartnerInboundPort,
    @Inject(PatchPartnerInboundPortToken) private readonly patchPartnerService: PatchPartnerInboundPort,
    @Inject(DeletePartnerInboundPortToken) private readonly deletePartnerService: DeletePartnerInboundPort,
    @Inject(ListToSelectPartnerInboundPortToken) private readonly listToSelectPartnerService: ListToSelectPartnerInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Partner' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreatePartnerDto) {
    return this.createPartnerService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Partner List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListPartnerDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listPartnerService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Partner' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchPartnerDto) {
    return this.patchPartnerService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Partner' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deletePartnerService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Partner List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectPartnerDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectPartnerService.execute(query)
  }
}
