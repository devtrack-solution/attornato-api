import { forwardRef, Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { LoadRolesFromCredentialService } from '@/application/services/securities/load-roles-from-credential.service'
import { LoadRolesFromCredentialInboundPortToken } from '@/domain/securities/ports/inbound/load-roles-from-credential.inbound-port'
import { LoginAuthInboundPortToken } from '@/domain/securities/ports/inbound/login-auth.inbound-port'
import { LoginService } from '@/application/services/securities/login.service'
import { JwtModule } from '@nestjs/jwt'
import { OnboardingAuthInboundPortToken } from '@/domain/securities/ports/inbound/onboarding-auth.inbound-port'
import { OnboardingService } from '@/application/services/securities/onboarding.service'
import process from 'node:process'

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
    JwtModule
  ],
})
export class SecurityModule {}
