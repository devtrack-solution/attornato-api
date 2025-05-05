import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CreateCommunicationChannelInboundPort, CreateCommunicationChannelInboundPortToken } from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/inbound/create-communication-channel.inbound-port'
import { PatchCommunicationChannelInboundPort, PatchCommunicationChannelInboundPortToken } from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/inbound/patch-communication-channel.inbound-port'
import { DeleteCommunicationChannelInboundPort, DeleteCommunicationChannelInboundPortToken } from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/inbound/delete-communication-channel.inbound-port'
import { ListToSelectCommunicationChannelInboundPort, ListToSelectCommunicationChannelInboundPortToken } from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/inbound/list-to-select-communication-channel.inbound-port'
import { CreateCommunicationChannelDto } from '@/presentation/controllers/http/client/component/person/communication-address/contact/communication-channel/dtos/create-communication-channel.dto'
import { PatchCommunicationChannelDto } from '@/presentation/controllers/http/client/component/person/communication-address/contact/communication-channel/dtos/patch-communication-channel.dto'
import { ListToSelectCommunicationChannelDto } from '@/presentation/controllers/http/client/component/person/communication-address/contact/communication-channel/dtos/list-to-select-communication-channel.dto'
import { ListCommunicationChannelDto } from '@/presentation/controllers/http/client/component/person/communication-address/contact/communication-channel/dtos/list-communication-channel.dto'
import { ListCommunicationChannelInboundPort, ListCommunicationChannelInboundPortToken } from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/inbound/list-communication-channel.inbound-port'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'

@ApiTags('Clients')
@Controller('clients/person/communication-address/contact/communication-channel')
export class CommunicationChannelHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateCommunicationChannelInboundPortToken) private readonly createCommunicationChannelService: CreateCommunicationChannelInboundPort,
    @Inject(ListCommunicationChannelInboundPortToken) private readonly listCommunicationChannelService: ListCommunicationChannelInboundPort,
    @Inject(PatchCommunicationChannelInboundPortToken) private readonly patchCommunicationChannelService: PatchCommunicationChannelInboundPort,
    @Inject(DeleteCommunicationChannelInboundPortToken) private readonly deleteCommunicationChannelService: DeleteCommunicationChannelInboundPort,
    @Inject(ListToSelectCommunicationChannelInboundPortToken) private readonly listToSelectCommunicationChannelService: ListToSelectCommunicationChannelInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Contact-Type' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateCommunicationChannelDto) {
    return this.createCommunicationChannelService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Contact-Type List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListCommunicationChannelDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listCommunicationChannelService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Contact-Type' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchCommunicationChannelDto) {
    return this.patchCommunicationChannelService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Contact-Type' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteCommunicationChannelService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Contact-Type List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectCommunicationChannelDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectCommunicationChannelService.execute(query)
  }
}
