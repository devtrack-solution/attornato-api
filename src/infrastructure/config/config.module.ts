import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { ConfigPortSymbol } from '@/application/ports/config.port'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'

export const ConfigEnvironmentPortSymbol = Symbol('ConfigEnvironmentPort')
export const ConfigLoaderPortSymbol = Symbol('ConfigLoaderPort')

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: ConfigEnvironmentPortSymbol,
      useClass: ConfigEnvironmentService,
    },
    {
      provide: ConfigLoaderPortSymbol,
      useClass: ConfigLoaderService,
    },
    {
      provide: ConfigPortSymbol,
      useClass: ConfigLoaderService,
    },
  ],
  exports: [ConfigEnvironmentPortSymbol, ConfigLoaderPortSymbol, ConfigPortSymbol],
})
export class ConfigModule {}
