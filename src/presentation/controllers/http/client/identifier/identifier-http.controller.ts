import { Controller, Post, Body, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CreateIdentifierInboundPortToken, CreateIdentifierInboundPort } from '@/domain/client/identifier/ports/inbound/create-identifier-responsible.inbound-port'
import { CreateIdentifierDto } from './dtos/create-identifier.dto'
import { LastIdentifierInboundPort, LastIdentifierInboundPortToken } from '@/domain/client/identifier/ports/inbound/last-identifier.inbound-port'

@ApiTags('Clients')
@Controller('clients/identifier')
export class IdentifierHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateIdentifierInboundPortToken) private readonly createIdentifierService: CreateIdentifierInboundPort,
    @Inject(LastIdentifierInboundPortToken) private readonly lastIdentifierService: LastIdentifierInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Identifier' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateIdentifierDto) {
    const { clientCategory } = body

    const last = await this.lastIdentifierService.execute({
      offset: 0,
      limit: 1,
      search: clientCategory,
    })

    const lastValue = last?.data?.[0]?.value ?? 0

    const bodyResult = {
      value: lastValue + 1,
      clientCategory,
    }

    return this.createIdentifierService.execute(bodyResult)
  }
}
