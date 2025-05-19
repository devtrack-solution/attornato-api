import { Controller, Body, Inject, Get, Param, Patch, Query, UseGuards, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'
import { PatchAccountPersonInboundPort, PatchAccountPersonInboundPortToken } from '@/domain/account/component/account-person/ports/inbound/patch-account-person.inbound-port'
import { PatchAccountPersonDto } from '@/presentation/controllers/http/account/component/account-person/dtos/patch-account-person.dto'

@ApiTags('Accounts')
@Controller('account/persons')
export class AccountPersonHttpController extends BaseHttpController {
  constructor(@Inject(PatchAccountPersonInboundPortToken) private readonly patchAccountPersonService: PatchAccountPersonInboundPort) {
    super()
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
}
