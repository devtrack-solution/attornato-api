import { Controller, Inject, Get, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { ListClientInboundPort, ListClientInboundPortToken } from '@/domain/client/ports/inbound/list-client.inbound-port'
import { ListToSelectClientInboundPort, ListToSelectClientInboundPortToken } from '@/domain/client/ports/inbound/list-to-select-client.inbound-port'
import { ListClientDto } from '@/presentation/controllers/http/client/dtos/list-client.dto'
import { ListToSelectClientDto } from '@/presentation/controllers/http/client/dtos/list-to-select-client.dto'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'

@ApiTags('Clients')
@Controller('clients')
export class ClientHttpController extends BaseHttpController {
  constructor(
    @Inject(ListClientInboundPortToken) private readonly listClientService: ListClientInboundPort,
    @Inject(ListToSelectClientInboundPortToken) private readonly listToSelectClientService: ListToSelectClientInboundPort,
  ) {
    super()
  }

  // @Post()
  // @ApiOperation({ summary: 'Create a new Client' })
  // @ApiResponse({ status: 201, description: 'The item has been created.' })
  // async create(@Body() body: CreateClientDto) {
  //   return this.createClientService.execute(body)
  // }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Client List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListClientDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listClientService.execute(query)
  }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Patch a Client' })
  // @ApiResponse({ status: 200, description: 'The item has been patched.' })
  // async patch(@Param('id') id: string, @Body() body: PatchClientDto) {
  //   return this.patchClientService.execute(body, { id })
  // }
  //
  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a Client' })
  // @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  // async delete(@Param('id') id: string) {
  //   return this.deleteClientService.execute({ id })
  // }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List Client List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectClientDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectClientService.execute(query)
  }
}
