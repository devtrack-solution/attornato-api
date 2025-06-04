import { Module } from '@nestjs/common'
import { LoginAuthInboundPortToken } from '@/domain/securities/ports/inbound/component/auth/login-auth.inbound-port'
import { LoginService } from '@/application/services/securities/login.service'
import { OnboardingAuthInboundPortToken } from '@/domain/securities/ports/inbound/component/auth/onboarding-auth.inbound-port'
import { OnboardingService } from '@/application/services/securities/onboarding.service'
import { ForgotService } from '@/application/services/securities/forgot.service'
import { ForgotAuthInboundPortToken } from '@/domain/securities/ports/inbound/component/auth/forgot-auth.inbound-port'
import { ResetAuthInboundPortToken } from '@/domain/securities/ports/inbound/component/auth/reset-auth.inbound-port'
import { ResetService } from '@/application/services/securities/reset.service'
import { PatchCredentialService } from '@/application/services/securities/patch-credential.service'
import { PatchCredentialInboundPortToken } from '@/domain/securities/ports/inbound/component/auth/patch-credential.inbound-port'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'

@Module({
  imports: [
    InfrastructureModule,
  ],
  providers: [
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
})
export class SecurityModule {}
