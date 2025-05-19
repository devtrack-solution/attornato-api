import { Controller, Inject, Get, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { ListProcessInboundPort, ListProcessInboundPortToken } from '@/domain/process/ports/inbound/list-process.inbound-port'
import { ListToSelectProcessInboundPort, ListToSelectProcessInboundPortToken } from '@/domain/process/ports/inbound/list-to-select-process.inbound-port'
import { ListProcessDto } from '@/presentation/controllers/http/process/dtos/list-process.dto'
import { ListToSelectProcessDto } from '@/presentation/controllers/http/process/dtos/list-to-select-process.dto'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'

@ApiTags('Process')
@Controller('process')
export class ProcessHttpController extends BaseHttpController {
  constructor(
    @Inject(ListProcessInboundPortToken) private readonly listProcessService: ListProcessInboundPort,
    @Inject(ListToSelectProcessInboundPortToken) private readonly listToSelectProcessService: ListToSelectProcessInboundPort,
  ) {
    super()
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Process List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListProcessDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listProcessService.execute(query)
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List Process List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectProcessDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectProcessService.execute(query)
  }
}
