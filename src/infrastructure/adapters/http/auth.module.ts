import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { ApplicationModule } from '@/application/application.module'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
const config: AppConfig = new ConfigEnvironmentService()

@Module({
  imports: [
    forwardRef(() => ApplicationModule),
    JwtModule.register({
      publicKey: config.jwt.publicKeyBase64,
      signOptions: {
        algorithm: 'RS512',
        expiresIn: config.jwt.refreshTokenExpInSec,
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [JwtModule],
})
export class AuthModule {}
