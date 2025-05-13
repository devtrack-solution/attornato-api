import { Controller, Post, Body, Inject, Req, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { LoginAuthDto } from '@/presentation/controllers/http/securities/auth/dtos/login-auth.dto'
import { LoginAuthInboundPort, LoginAuthInboundPortToken } from '@/domain/securities/ports/inbound/login-auth.inbound-port'
import { OnboardingAuthDto } from '@/presentation/controllers/http/securities/auth/dtos/onboarding-auth.dto'
import { OnboardingAuthInboundPort, OnboardingAuthInboundPortToken } from '@/domain/securities/ports/inbound/onboarding-auth.inbound-port'

@ApiTags('Auth')
@Controller('auth')
export class AuthHttpController extends BaseHttpController {
  constructor(
    @Inject(LoginAuthInboundPortToken) private readonly createAuthService: LoginAuthInboundPort,
    @Inject(OnboardingAuthInboundPortToken) private readonly onboardingService: OnboardingAuthInboundPort,
    // @Inject(PatchAuthInboundPortToken) private readonly patchAuthService: PatchAuthInboundPort,
    // @Inject(DeleteAuthInboundPortToken) private readonly deleteAuthService: DeleteAuthInboundPort,
    // @Inject(ListToSelectAuthInboundPortToken) private readonly listToSelectAuthService: ListToSelectAuthInboundPort,
  ) {
    super()
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login a new Auth' })
  @ApiResponse({ status: 201, description: 'The item has been created an token.' })
  async create(@Body() body: LoginAuthDto) {
    return this.createAuthService.execute(body)
  }

  @Post('/onboarding')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Make token for access platform' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: OnboardingAuthDto })
  async find(@Req() req: any, @Body() body: OnboardingAuthDto) {
    return this.onboardingService.execute({ accountId: req.headers.profile.accountId, roleId: body.roleId })
  }

  //
  // @Patch(':id')
  // @ApiOperation({ summary: 'Patch a Auth' })
  // @ApiResponse({ status: 200, description: 'The item has been patched.' })
  // async patch(@Param('id') id: string, @Body() body: PatchAuthDto) {
  //   return this.patchAuthService.execute(body, { id })
  // }
  //
  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a Auth' })
  // @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  // async delete(@Param('id') id: string) {
  //   return this.deleteAuthService.execute({ id })
  // }
  //
  // @Get('to/selects')
  // @ApiOperation({ summary: 'List Auth List to select' })
  // @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectAuthDto })
  // async findToSelect(@Query() query: CriteriaFindByRequestDto) {
  //   return this.listToSelectAuthService.execute(query)
  // }
}
