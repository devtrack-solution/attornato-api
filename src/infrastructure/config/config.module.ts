import { Module } from '@nestjs/common'
import { ConfigPortSymbol } from '@/application/domain/ports/config.port'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'

@Module({
  imports: [],
  providers: [
    {
      provide: ConfigPortSymbol,
      useClass: ConfigEnvironmentService,
    },
  ],
  exports: [
    {
      provide: ConfigPortSymbol,
      useClass: ConfigEnvironmentService,
    },
  ],
})
export class ConfigModule {}
