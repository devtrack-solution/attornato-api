import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { DeleteFreeField2InboundPortToken, DeleteFreeField2InboundPort } from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/delete-free-field-2.inbound-port'
import { ListFreeField2InboundPortToken, ListFreeField2InboundPort } from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/list-free-field-2.inbound-port'
import {
  ListToSelectFreeField2InboundPortToken,
  ListToSelectFreeField2InboundPort,
} from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/list-to-select-free-field-2.inbound-port'
import { PatchFreeField2InboundPortToken, PatchFreeField2InboundPort } from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/patch-free-field-2.inbound-port'
import { CreateFreeField2Dto } from './dtos/create-free-field-2.dto'
import { ListFreeField2Dto } from './dtos/list-free-field-2.dto'
import { ListToSelectFreeField2Dto } from './dtos/list-to-select-free-field-2.dto'
import { PatchFreeField2Dto } from '@/presentation/controllers/http/process/component/process-detail/component/free-field-2/dtos/patch-free-field-2.dto'
import { CreateFreeField2InboundPort, CreateFreeField2InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/create-free-field-2.inbound-port'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'

@ApiTags('Process')
@Controller('process/process-detail/free-field-2')
export class FreeField2HttpController extends BaseHttpController {
  constructor(
    @Inject(CreateFreeField2InboundPortToken) private readonly createFreeField2Service: CreateFreeField2InboundPort,
    @Inject(ListFreeField2InboundPortToken) private readonly listFreeField2Service: ListFreeField2InboundPort,
    @Inject(PatchFreeField2InboundPortToken) private readonly patchFreeField2Service: PatchFreeField2InboundPort,
    @Inject(DeleteFreeField2InboundPortToken) private readonly deleteFreeField2Service: DeleteFreeField2InboundPort,
    @Inject(ListToSelectFreeField2InboundPortToken) private readonly listToSelectFreeField2Service: ListToSelectFreeField2InboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new FreeField2' })
  @ApiResponse({ status: 202, description: 'The item has been created.' })
  async create(@Body() body: CreateFreeField2Dto) {
    return this.createFreeField2Service.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a FreeField2 List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListFreeField2Dto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listFreeField2Service.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a FreeField2' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchFreeField2Dto) {
    return this.patchFreeField2Service.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a FreeField2' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteFreeField2Service.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List FreeField2 List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectFreeField2Dto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectFreeField2Service.execute(query)
  }
}
