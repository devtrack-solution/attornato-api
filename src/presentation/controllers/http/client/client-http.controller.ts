import { Controller, Inject, Get, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { ListClientInboundPort, ListClientInboundPortToken } from '@/domain/client/ports/inbound/list-client.inbound-port'


@ApiTags('Clients')
@Controller('clients')
export class ClientHttpController extends BaseHttpController {
  constructor(
    @Inject(ListClientInboundPortToken) private readonly listClientService: ListClientInboundPort,
  ) {
    super()
  }

  @Get()
  @ApiOperation({ summary: 'Find a Client List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.' })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listClientService.execute(query)
  }
}
