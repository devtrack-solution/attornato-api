import { forwardRef, Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { LoadRolesFromCredentialService } from '@/application/services/securities/load-roles-from-credential.service'
import { LoadRolesFromCredentialInboundPortToken } from '@/domain/securities/ports/inbound/load-roles-from-credential.inbound-port'
import { LoginAuthInboundPortToken } from '@/domain/securities/ports/inbound/component/auth/login-auth.inbound-port'
import { LoginService } from '@/application/services/securities/login.service'
import { JwtModule } from '@nestjs/jwt'
import { OnboardingAuthInboundPortToken } from '@/domain/securities/ports/inbound/component/auth/onboarding-auth.inbound-port'
import { OnboardingService } from '@/application/services/securities/onboarding.service'
import process from 'node:process'
import { ForgotService } from '@/application/services/securities/forgot.service'
import { ForgotAuthInboundPortToken } from '@/domain/securities/ports/inbound/component/auth/forgot-auth.inbound-port'
import { ResetAuthInboundPortToken } from '@/domain/securities/ports/inbound/component/auth/reset-auth.inbound-port'
import { ResetService } from '@/application/services/securities/reset.service'
import { PatchCredentialService } from '@/application/services/securities/patch-credential.service'
import { PatchCredentialInboundPortToken } from '@/domain/securities/ports/inbound/component/auth/patch-credential.inbound-port'

@Module({
  imports: [
    forwardRef(() => CoreModule),
    JwtModule.register({
      signOptions: {
        algorithm: 'RS512',
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXP_IN_SEC,
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: LoadRolesFromCredentialInboundPortToken,
      useClass: LoadRolesFromCredentialService,
    },
    {
      provide: LoginAuthInboundPortToken,
      useClass: LoginService,
    },
    {
      provide: OnboardingAuthInboundPortToken,
      useClass: OnboardingService,
    },
    {
      provide: ForgotAuthInboundPortToken,
      useClass: ForgotService,
    },
    {
      provide: ResetAuthInboundPortToken,
      useClass: ResetService,
    },
    {
      provide: PatchCredentialInboundPortToken,
      useClass: PatchCredentialService,
    },
  ],
  exports: [
    {
      provide: LoadRolesFromCredentialInboundPortToken,
      useClass: LoadRolesFromCredentialService,
    },
    {
      provide: LoginAuthInboundPortToken,
      useClass: LoginService,
    },
    {
      provide: OnboardingAuthInboundPortToken,
      useClass: OnboardingService,
    },
    {
      provide: ForgotAuthInboundPortToken,
      useClass: ForgotService,
    },
    {
      provide: ResetAuthInboundPortToken,
      useClass: ResetService,
    },
    {
      provide: PatchCredentialInboundPortToken,
      useClass: PatchCredentialService,
    },
    JwtModule,
  ],
})
export class SecurityModule {}
