import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CreatePracticeAreaInboundPort, CreatePracticeAreaInboundPortToken } from '@/domain/process/component/practice-area/ports/inbound/create-practice-area.inbound-port'
import { ListPracticeAreaInboundPort, ListPracticeAreaInboundPortToken } from '@/domain/process/component/practice-area/ports/inbound/list-practice-area.inbound-port'
import { PatchPracticeAreaInboundPort, PatchPracticeAreaInboundPortToken } from '@/domain/process/component/practice-area/ports/inbound/patch-practice-area.inbound-port'
import { DeletePracticeAreaInboundPort, DeletePracticeAreaInboundPortToken } from '@/domain/process/component/practice-area/ports/inbound/delete-practice-area.inbound-port'
import { ListToSelectPracticeAreaInboundPort, ListToSelectPracticeAreaInboundPortToken } from '@/domain/process/component/practice-area/ports/inbound/list-to-select-practice-area.inbound-port'
import { CreatePracticeAreaDto } from '@/presentation/controllers/http/process/component/practice-area/dtos/create-practice-area.dto'
import { ListPracticeAreaDto } from '@/presentation/controllers/http/process/component/practice-area/dtos/list-practice-area.dto'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { PatchPracticeAreaDto } from '@/presentation/controllers/http/process/component/practice-area/dtos/patch-practice-area.dto'
import { ListToSelectPracticeAreaDto } from '@/presentation/controllers/http/process/component/practice-area/dtos/list-to-select-practice-area.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'

@ApiTags('Process')
@Controller('process/practice-areas')
export class PracticeAreaHttpController extends BaseHttpController {
  constructor(
    @Inject(CreatePracticeAreaInboundPortToken) private readonly createPracticeAreaService: CreatePracticeAreaInboundPort,
    @Inject(ListPracticeAreaInboundPortToken) private readonly listPracticeAreaService: ListPracticeAreaInboundPort,
    @Inject(PatchPracticeAreaInboundPortToken) private readonly patchPracticeAreaService: PatchPracticeAreaInboundPort,
    @Inject(DeletePracticeAreaInboundPortToken) private readonly deletePracticeAreaService: DeletePracticeAreaInboundPort,
    @Inject(ListToSelectPracticeAreaInboundPortToken) private readonly listToSelectPracticeAreaService: ListToSelectPracticeAreaInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new Practice-Area' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreatePracticeAreaDto) {
    return this.createPracticeAreaService.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Practice-Area List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListPracticeAreaDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listPracticeAreaService.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a Practice-Area' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchPracticeAreaDto) {
    return this.patchPracticeAreaService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a Practice-Area' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deletePracticeAreaService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List Practice-Area List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectPracticeAreaDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectPracticeAreaService.execute(query)
  }
}
