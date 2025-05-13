import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { ApplicationModule } from '@/application/application.module'
import { SecurityModule } from '@/application/services/securities/security.module'
import process from 'node:process'
import { RolesGuard } from '@/commons/guard/roles.guard'


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
      useClass: RolesGuard,
    },
  ],
  exports: [JwtModule]
})
export class AuthModule {}
