import { Controller, Post, Body, Inject, Req, UseGuards, Patch, Param, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { LoginAuthDto } from '@/presentation/controllers/http/securities/auth/dtos/login-auth.dto'
import {
  LoginAuthInboundPort,
  LoginAuthInboundPortToken,
} from '@/domain/securities/ports/inbound/login-auth.inbound-port'
import { OnboardingAuthDto } from '@/presentation/controllers/http/securities/auth/dtos/onboarding-auth.dto'
import {
  OnboardingAuthInboundPort,
  OnboardingAuthInboundPortToken,
} from '@/domain/securities/ports/inbound/onboarding-auth.inbound-port'
import {
  ForgotAuthInboundPort,
  ForgotAuthInboundPortToken,
} from '@/domain/securities/ports/inbound/forgot-auth.inbound-port'
import {
  ResetAuthInboundPort,
  ResetAuthInboundPortToken,
} from '@/domain/securities/ports/inbound/reset-auth.inbound-port'
import { ForgotDto } from '@/presentation/controllers/http/securities/auth/dtos/forgot.dto'
import { ResetDto } from '@/presentation/controllers/http/securities/auth/dtos/reset.dto'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Permissions } from '@/commons/guard/permissions.decorator'
import { Roles } from '@/commons/guard/roles'

@ApiTags('Auth')
@Controller('auth')
export class AuthHttpController extends BaseHttpController {
  constructor(
    @Inject(LoginAuthInboundPortToken) private readonly createAuthService: LoginAuthInboundPort,
    @Inject(OnboardingAuthInboundPortToken) private readonly onboardingService: OnboardingAuthInboundPort,
    @Inject(ForgotAuthInboundPortToken) private readonly forgotService: ForgotAuthInboundPort,
    @Inject(ResetAuthInboundPortToken) private readonly resetService: ResetAuthInboundPort,
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

  @Patch('guest/reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({ status: 200, description: 'The item has been patched.' })
  async patch(
    @Query('username') username: string,
    @Query('code') forgotCode: string,
    @Body() body: ResetDto) {
    return this.resetService.execute({ ...body, username, forgotCode })
  }

  @Post('/forgot/password')
  @ApiOperation({ summary: 'Forgot password' })
  @ApiResponse({ status: 201, description: 'Send email with code for reset password.' })
  async reset(@Body() body: ForgotDto) {
    return this.forgotService.execute(body)
  }
}
