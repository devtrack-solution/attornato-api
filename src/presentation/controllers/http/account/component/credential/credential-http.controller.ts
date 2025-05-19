import { Controller, Body, Inject, Get, Param, Patch, Query, UseGuards, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'
import { PatchCredentialDto } from '@/presentation/controllers/http/account/component/credential/dtos/patch-credential.dto'
import { PatchCredentialInboundPort, PatchCredentialInboundPortToken } from '@/domain/securities/ports/inbound/component/auth/patch-credential.inbound-port'

@ApiTags('Accounts')
@Controller('account/credential')
export class CredentialHttpController extends BaseHttpController {
  constructor(@Inject(PatchCredentialInboundPortToken) private readonly patchCredentialService: PatchCredentialInboundPort) {
    super()
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Patch a Credential' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(@Param('id') id: string, @Body() body: PatchCredentialDto) {
    return this.patchCredentialService.execute(body, { id })
  }
}
