import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { DeleteFreeField1InboundPortToken, DeleteFreeField1InboundPort } from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/delete-free-field-1.inbound-port'
import { ListFreeField1InboundPortToken, ListFreeField1InboundPort } from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/list-free-field-1.inbound-port'
import {
  ListToSelectFreeField1InboundPortToken,
  ListToSelectFreeField1InboundPort,
} from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/list-to-select-free-field-1.inbound-port'
import { PatchFreeField1InboundPortToken, PatchFreeField1InboundPort } from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/patch-free-field-1.inbound-port'
import { CreateFreeField1Dto } from './dtos/create-free-field-1.dto'
import { ListFreeField1Dto } from './dtos/list-free-field-1.dto'
import { ListToSelectFreeField1Dto } from './dtos/list-to-select-free-field-1.dto'
import { PatchFreeField1Dto } from '@/presentation/controllers/http/process/component/process-detail/component/free-field-1/dtos/patch-free-field-1.dto'
import { CreateFreeField1InboundPort, CreateFreeField1InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/create-free-field-1.inbound-port'

import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/infrastructure/adapters/http/auth/roles'
import { Permissions } from '@/infrastructure/adapters/http/auth/permission.decorator'

@ApiTags('Process')
@Controller('process/precess-detail/free-field-1')
export class FreeField1HttpController extends BaseHttpController {
  constructor(
    @Inject(CreateFreeField1InboundPortToken) private readonly createFreeField1Service: CreateFreeField1InboundPort,
    @Inject(ListFreeField1InboundPortToken) private readonly listFreeField1Service: ListFreeField1InboundPort,
    @Inject(PatchFreeField1InboundPortToken) private readonly patchFreeField1Service: PatchFreeField1InboundPort,
    @Inject(DeleteFreeField1InboundPortToken) private readonly deleteFreeField1Service: DeleteFreeField1InboundPort,
    @Inject(ListToSelectFreeField1InboundPortToken) private readonly listToSelectFreeField1Service: ListToSelectFreeField1InboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new FreeField1' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateFreeField1Dto) {
    return this.createFreeField1Service.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a FreeField1 List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListFreeField1Dto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listFreeField1Service.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a FreeField1' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchFreeField1Dto) {
    return this.patchFreeField1Service.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a FreeField1' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteFreeField1Service.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List FreeField1 List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectFreeField1Dto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectFreeField1Service.execute(query)
  }
}
