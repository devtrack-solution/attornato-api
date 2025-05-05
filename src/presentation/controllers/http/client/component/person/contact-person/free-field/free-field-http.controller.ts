import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { ListToSelectFreeFieldDto } from '@/presentation/controllers/http/client/component/person/contact-person/free-field/dtos/list-to-select-free-field.dto'
import {
  CreateFreeFieldInboundPort,
  CreateFreeFieldInboundPortToken,
} from '@/domain/client/component/person/contact-person/free-field/ports/inbound/create-free-field.inbound-port'
import {
  ListFreeFieldInboundPort,
  ListFreeFieldInboundPortToken,
} from '@/domain/client/component/person/contact-person/free-field/ports/inbound/list-free-field.inbound-port'
import {
  PatchFreeFieldInboundPort,
  PatchFreeFieldInboundPortToken,
} from '@/domain/client/component/person/contact-person/free-field/ports/inbound/patch-free-field.inbound-port'
import {
  DeleteFreeFieldInboundPort,
  DeleteFreeFieldInboundPortToken,
} from '@/domain/client/component/person/contact-person/free-field/ports/inbound/delete-free-field.inbound-port'
import {
  ListToSelectFreeFieldInboundPort,
  ListToSelectFreeFieldInboundPortToken,
} from '@/domain/client/component/person/contact-person/free-field/ports/inbound/list-to-select-free-field.inbound-port'
import { CreateFreeFieldDto } from '@/presentation/controllers/http/client/component/person/contact-person/free-field/dtos/create-free-field.dto'
import { ListFreeFieldDto } from '@/presentation/controllers/http/client/component/person/contact-person/free-field/dtos/list-free-field.dto'
import { PatchFreeFieldDto } from '@/presentation/controllers/http/client/component/person/contact-person/free-field/dtos/patch-free-field.dto'

@ApiTags('Clients')
@Controller('clients/person/contact-person/free-fields')
export class FreeFieldHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateFreeFieldInboundPortToken) private readonly createFreeFieldService: CreateFreeFieldInboundPort,
    @Inject(ListFreeFieldInboundPortToken) private readonly listFreeFieldService: ListFreeFieldInboundPort,
    @Inject(PatchFreeFieldInboundPortToken) private readonly patchFreeFieldService: PatchFreeFieldInboundPort,
    @Inject(DeleteFreeFieldInboundPortToken) private readonly deleteFreeFieldService: DeleteFreeFieldInboundPort,
    @Inject(ListToSelectFreeFieldInboundPortToken) private readonly listToSelectFreeFieldService: ListToSelectFreeFieldInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Free-Field' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateFreeFieldDto) {
    return this.createFreeFieldService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Free-Field List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListFreeFieldDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listFreeFieldService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Free-Field' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchFreeFieldDto) {
    return this.patchFreeFieldService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Free-Field' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteFreeFieldService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Free-Field List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectFreeFieldDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectFreeFieldService.execute(query)
  }
}
