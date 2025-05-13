import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { RBACGuard } from '@/infrastructure/adapters/http/auth'
import { ApplicationModule } from '@/application/application.module'
import { SecurityModule } from '@/application/services/securities/security.module'
import process from 'node:process'


@Module({
  imports: [
    forwardRef(() => ApplicationModule),
    JwtModule.register({
      publicKey: process.env.JWT_PUBLIC_KEY_BASE64,
      signOptions: {
        algorithm: 'RS512',
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXP_IN_SEC,
      },
    }),
    SecurityModule,
  ],
  providers:[
    {
      provide: APP_GUARD,
      useClass: RBACGuard,
    },
  ],
  exports: [JwtModule]
})
export class AuthModule {}
