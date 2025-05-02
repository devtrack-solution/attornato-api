import { Controller, Post, Body, Inject, Get, Put, Param, Delete, Patch, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CreateProfileInboundPort, CreateProfileInboundPortToken } from '@/domain/client/component/profile/ports/inbound/create-profile.inbound-port'
import { PatchProfileInboundPort, PatchProfileInboundPortToken } from '@/domain/client/component/profile/ports/inbound/patch-profile.inbound-port'
import { DeleteProfileInboundPort, DeleteProfileInboundPortToken } from '@/domain/client/component/profile/ports/inbound/delete-profile.inbound-port'
import { ListToSelectProfileInboundPort, ListToSelectProfileInboundPortToken } from '@/domain/client/component/profile/ports/inbound/list-to-select-profile.inbound-port'
import { ListProfileInboundPort, ListProfileInboundPortToken } from '@/domain/client/component/profile/ports/inbound/list-profile.inbound-port'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { CreateProfileDto } from '@/presentation/controllers/http/client/profile/dtos/create-profile.dto'
import { ListProfileDto } from '@/presentation/controllers/http/client/profile/dtos/list-profile.dto'
import { PatchProfileDto } from '@/presentation/controllers/http/client/profile/dtos/patch-profile.dto'
import { ListToSelectProfileDto } from '@/presentation/controllers/http/client/profile/dtos/list-to-select-profile.dto'

@ApiTags('Clients')
@Controller('clients/profile')
export class ProfileHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateProfileInboundPortToken) private readonly createProfileService: CreateProfileInboundPort,
    @Inject(ListProfileInboundPortToken) private readonly listProfileService: ListProfileInboundPort,
    @Inject(PatchProfileInboundPortToken) private readonly patchProfileService: PatchProfileInboundPort,
    @Inject(DeleteProfileInboundPortToken) private readonly deleteProfileService: DeleteProfileInboundPort,
    @Inject(ListToSelectProfileInboundPortToken) private readonly listToSelectProfileService: ListToSelectProfileInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Profile' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateProfileDto) {
    return this.createProfileService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find a Profile List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListProfileDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listProfileService.execute(query)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a Profile' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchProfileDto) {
    return this.patchProfileService.execute(body, { id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Profile' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteProfileService.execute({ id })
  }

  @Get('to/selects')
  @ApiOperation({ summary: 'List Profile List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectProfileDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectProfileService.execute(query)
  }
}
