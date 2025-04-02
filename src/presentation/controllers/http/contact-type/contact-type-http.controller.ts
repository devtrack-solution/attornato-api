import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CreateContactTypeInboundPort, CreateContactTypeInboundPortToken } from '@/domain/contact-type/ports/inbound/create-contact-type.inbound-port'
import { PatchContactTypeInboundPort, PatchContactTypeInboundPortToken } from '@/domain/contact-type/ports/inbound/patch-contact-type.inbound-port'
import { DeleteContactTypeInboundPort, DeleteContactTypeInboundPortToken } from '@/domain/contact-type/ports/inbound/delete-contact-type.inbound-port'
import { ListToSelectContactTypeInboundPort, ListToSelectContactTypeInboundPortToken } from '@/domain/contact-type/ports/inbound/list-to-select-contact-type.inbound-port'
import { CreateContactTypeDto } from '@/presentation/controllers/http/contact-type/dtos/create-contact-type.dto'
import { PatchContactTypeDto } from '@/presentation/controllers/http/contact-type/dtos/patch-contact-type.dto'
import { ListToSelectContactTypeDto } from '@/presentation/controllers/http/contact-type/dtos/list-to-select-contact-type.dto'
import { ListContactTypeDto } from '@/presentation/controllers/http/contact-type/dtos/list-contact-type.dto'
import { ListContactTypeInboundPort, ListContactTypeInboundPortToken } from '@/domain/contact-type/ports/inbound/list-contact-type.inbound-port'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'

@ApiTags('Contact-Type')
@Controller('contact-type')
export class ContactTypeHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateContactTypeInboundPortToken) private readonly createContactTypeService: CreateContactTypeInboundPort,
    @Inject(ListContactTypeInboundPortToken) private readonly listContactTypeService: ListContactTypeInboundPort,
    @Inject(PatchContactTypeInboundPortToken) private readonly patchContactTypeService: PatchContactTypeInboundPort,
    @Inject(DeleteContactTypeInboundPortToken) private readonly deleteContactTypeService: DeleteContactTypeInboundPort,
    @Inject(ListToSelectContactTypeInboundPortToken) private readonly listToSelectContactTypeService: ListToSelectContactTypeInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Contact-Type' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateContactTypeDto) {
    return this.createContactTypeService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Contact-Type List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListContactTypeDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listContactTypeService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Contact-Type' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchContactTypeDto) {
    return this.patchContactTypeService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Contact-Type' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteContactTypeService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Contact-Type List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectContactTypeDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectContactTypeService.execute(query)
  }
}
