import { Controller, Body, Inject, Get, Param, Patch, Query, UseGuards, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'
import { ListAccountPersonInboundPort, ListAccountPersonInboundPortToken } from '@/domain/account/component/account-person/ports/inbound/list-account-person.inbound-port'
import { PatchAccountPersonInboundPort, PatchAccountPersonInboundPortToken } from '@/domain/account/component/account-person/ports/inbound/patch-account-person.inbound-port'
import { ListAccountPersonDto } from '@/presentation/controllers/http/account/component/account-person/dtos/list-account-person.dto'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { PatchAccountPersonDto } from '@/presentation/controllers/http/account/component/account-person/dtos/patch-account-person.dto'

@ApiTags('Accounts')
@Controller('account/persons')
export class AccountPersonHttpController extends BaseHttpController {
  constructor(
    @Inject(ListAccountPersonInboundPortToken) private readonly listAccountPersonService: ListAccountPersonInboundPort,
    @Inject(PatchAccountPersonInboundPortToken) private readonly patchAccountPersonService: PatchAccountPersonInboundPort,
    // @Inject(CreateAccountPersonInboundPortToken) private readonly createAccountPersonService: CreateAccountPersonInboundPort,
    // @Inject(DeleteAccountPersonInboundPortToken) private readonly deleteAccountPersonService: DeleteAccountPersonInboundPort,
  ) {
    super()
  }

  // @Post()
  // @ApiBearerAuth()
  // @UseGuards(RolesGuard)
  // @ApiOperation({ summary: 'Create a new AccountPerson' })
  // @ApiResponse({ status: 201, description: 'The item has been created.' })
  // async create(@Body() body: CreateAccountPersonDto) {
  //   return this.createAccountPersonService.execute(body)
  // }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a AccountPerson List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListAccountPersonDto })
  async find(@Query() query: CriteriaPaginatedRequestDto, @Req() req: any) {
    return this.listAccountPersonService.execute(query)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a AccountPerson' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchAccountPersonDto) {
    return this.patchAccountPersonService.execute(body, { id })
  }

  // @Delete(':id')
  // @ApiBearerAuth()
  // @UseGuards(RolesGuard)
  // @ApiOperation({ summary: 'Delete a AccountPerson' })
  // @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  // async delete(@Param('id') id: string) {
  //   return this.deleteAccountPersonService.execute({ id })
  // }
}
