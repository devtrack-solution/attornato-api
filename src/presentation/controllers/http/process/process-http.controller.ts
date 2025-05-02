import { Controller, Inject, Get, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { ListProcessInboundPort, ListProcessInboundPortToken } from '@/domain/process/ports/inbound/list-process.inbound-port'
import { ListToSelectProcessInboundPort, ListToSelectProcessInboundPortToken } from '@/domain/process/ports/inbound/list-to-select-process.inbound-port'
import { ListProcessDto } from '@/presentation/controllers/http/process/dtos/list-process.dto'
import { ListToSelectProcessDto } from '@/presentation/controllers/http/process/dtos/list-to-select-process.dto'

@ApiTags('Process')
@Controller('process')
export class ProcessHttpController extends BaseHttpController {
  constructor(
    // @Inject(CreateProcessInboundPortToken) private readonly createProcessService: CreateProcessInboundPort,
    @Inject(ListProcessInboundPortToken) private readonly listProcessService: ListProcessInboundPort,
    // @Inject(PatchProcessInboundPortToken) private readonly patchProcessService: PatchProcessInboundPort,
    // @Inject(DeleteProcessInboundPortToken) private readonly deleteProcessService: DeleteProcessInboundPort,
    @Inject(ListToSelectProcessInboundPortToken) private readonly listToSelectProcessService: ListToSelectProcessInboundPort,
  ) {
    super()
  }

  // @Post()
  // @ApiOperation({ summary: 'Create a new Process' })
  // @ApiResponse({ status: 201, description: 'The item has been created.' })
  // async create(@Body() body: CreateProcessDto) {
  //   return this.createProcessService.execute(body)
  // }

  @Get()
  @ApiOperation({ summary: 'Find a Process List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListProcessDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listProcessService.execute(query)
  }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Patch a Process' })
  // @ApiResponse({ status: 200, description: 'The item has been patched.' })
  // async patch(@Param('id') id: string, @Body() body: PatchProcessDto) {
  //   return this.patchProcessService.execute(body, { id })
  // }
  //
  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a Process' })
  // @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  // async delete(@Param('id') id: string) {
  //   return this.deleteProcessService.execute({ id })
  // }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Process List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectProcessDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectProcessService.execute(query)
  }
}
