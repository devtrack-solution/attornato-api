import { Controller, Post, Body, Inject, Get, Param, Delete, Patch, Query, UseGuards, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CreatePreferenceInboundPort, CreatePreferenceInboundPortToken } from '@/domain/account/component/preference/ports/inbound/create-preference.inbound-port'
import { PatchPreferenceInboundPort, PatchPreferenceInboundPortToken } from '@/domain/account/component/preference/ports/inbound/patch-preference.inbound-port'
import { DeletePreferenceInboundPort, DeletePreferenceInboundPortToken } from '@/domain/account/component/preference/ports/inbound/delete-preference.inbound-port'
import { ListPreferenceInboundPort, ListPreferenceInboundPortToken } from '@/domain/account/component/preference/ports/inbound/list-preference.inbound-port'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CreatePreferenceDto } from '@/presentation/controllers/http/account/component/preference/dtos/create-preference.dto'
import { ListPreferenceDto } from '@/presentation/controllers/http/account/component/preference/dtos/list-preference.dto'
import { PatchPreferenceDto } from '@/presentation/controllers/http/account/component/preference/dtos/patch-preference.dto'
import { RolesGuard } from '@/commons/guard/roles.guard'

@ApiTags('Accounts')
@Controller('account/preferences')
export class PreferenceHttpController extends BaseHttpController {
  constructor(
    @Inject(CreatePreferenceInboundPortToken) private readonly createPreferenceService: CreatePreferenceInboundPort,
    @Inject(ListPreferenceInboundPortToken) private readonly listPreferenceService: ListPreferenceInboundPort,
    @Inject(PatchPreferenceInboundPortToken) private readonly patchPreferenceService: PatchPreferenceInboundPort,
    @Inject(DeletePreferenceInboundPortToken) private readonly deletePreferenceService: DeletePreferenceInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new Preference' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreatePreferenceDto, @Req() request: any) {
    let newBody = {
      ...body,
      accountId: request.headers.profile.accountId,
    }
    return this.createPreferenceService.execute(newBody)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Find a Preference List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListPreferenceDto })
  async find(@Query() query: CriteriaPaginatedRequestDto, @Req() request: any) {
    console.log(JSON.stringify(request.headers.profile))
    let newQuery = {
      ...query,
      accountId: request.headers.profile.accountId,
    }
    return this.listPreferenceService.execute(newQuery)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Patch a Preference' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchPreferenceDto) {
    return this.patchPreferenceService.execute(body, { id })
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete a Preference' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deletePreferenceService.execute({ id })
  }
}
