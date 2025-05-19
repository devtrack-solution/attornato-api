import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { DeleteFreeField6InboundPortToken, DeleteFreeField6InboundPort } from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/delete-free-field-6.inbound-port'
import { ListFreeField6InboundPortToken, ListFreeField6InboundPort } from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/list-free-field-6.inbound-port'
import {
  ListToSelectFreeField6InboundPortToken,
  ListToSelectFreeField6InboundPort,
} from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/list-to-select-free-field-6.inbound-port'
import { PatchFreeField6InboundPortToken, PatchFreeField6InboundPort } from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/patch-free-field-6.inbound-port'
import { CreateFreeField6Dto } from './dtos/create-free-field-6.dto'
import { ListFreeField6Dto } from './dtos/list-free-field-6.dto'
import { ListToSelectFreeField6Dto } from './dtos/list-to-select-free-field-6.dto'
import { PatchFreeField6Dto } from '@/presentation/controllers/http/process/component/process-detail/component/free-field-6/dtos/patch-free-field-6.dto'
import { CreateFreeField6InboundPort, CreateFreeField6InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/create-free-field-6.inbound-port'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'

@ApiTags('Process')
@Controller('process/process-detail/free-field-6')
export class FreeField6HttpController extends BaseHttpController {
  constructor(
    @Inject(CreateFreeField6InboundPortToken) private readonly createFreeField6Service: CreateFreeField6InboundPort,
    @Inject(ListFreeField6InboundPortToken) private readonly listFreeField6Service: ListFreeField6InboundPort,
    @Inject(PatchFreeField6InboundPortToken) private readonly patchFreeField6Service: PatchFreeField6InboundPort,
    @Inject(DeleteFreeField6InboundPortToken) private readonly deleteFreeField6Service: DeleteFreeField6InboundPort,
    @Inject(ListToSelectFreeField6InboundPortToken) private readonly listToSelectFreeField6Service: ListToSelectFreeField6InboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new FreeField6' })
  @ApiResponse({ status: 206, description: 'The item has been created.' })
  async create(@Body() body: CreateFreeField6Dto) {
    return this.createFreeField6Service.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a FreeField6 List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListFreeField6Dto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listFreeField6Service.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a FreeField6' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchFreeField6Dto) {
    return this.patchFreeField6Service.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a FreeField6' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteFreeField6Service.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List FreeField6 List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectFreeField6Dto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectFreeField6Service.execute(query)
  }
}
