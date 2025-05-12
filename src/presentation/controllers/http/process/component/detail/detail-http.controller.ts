import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateDetailDto } from './dtos/create-detail.dto'
import { ListDetailDto } from './dtos/list-detail.dto'
import { ListToSelectDetailDto } from './dtos/list-to-select-detail.dto'
import { CreateDetailInboundPort, CreateDetailInboundPortToken } from '@/domain/process/component/detail/ports/inbound/create-detail-responsible.inbound-port'
import { ListDetailInboundPort, ListDetailInboundPortToken } from '@/domain/process/component/detail/ports/inbound/list-detail.inbound-port'
import { PatchDetailInboundPort, PatchDetailInboundPortToken } from '@/domain/process/component/detail/ports/inbound/patch-detail.inbound-port'
import { DeleteDetailInboundPort, DeleteDetailInboundPortToken } from '@/domain/process/component/detail/ports/inbound/delete-detail.inbound-port'
import { ListToSelectDetailInboundPort, ListToSelectDetailInboundPortToken } from '@/domain/process/component/detail/ports/inbound/list-to-select-detail.inbound-port'
import { PatchDetailDto } from '@/presentation/controllers/http/process/component/detail/dtos/patch-detail.dto'

import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/infrastructure/adapters/http/auth/roles'
import { Permissions } from '@/infrastructure/adapters/http/auth/permission.decorator'

@ApiTags('Process')
@Controller('process/details')
export class DetailHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateDetailInboundPortToken) private readonly createDetailService: CreateDetailInboundPort,
    @Inject(ListDetailInboundPortToken) private readonly listDetailService: ListDetailInboundPort,
    @Inject(PatchDetailInboundPortToken) private readonly patchDetailService: PatchDetailInboundPort,
    @Inject(DeleteDetailInboundPortToken) private readonly deleteDetailService: DeleteDetailInboundPort,
    @Inject(ListToSelectDetailInboundPortToken) private readonly listToSelectDetailService: ListToSelectDetailInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new Detail' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateDetailDto) {
    return this.createDetailService.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Detail List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListDetailDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listDetailService.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a Detail' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchDetailDto) {
    return this.patchDetailService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a Detail' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteDetailService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List Detail List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectDetailDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectDetailService.execute(query)
  }
}
