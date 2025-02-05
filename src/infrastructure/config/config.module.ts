import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ConfigEnvironmentService],
  exports: [ConfigEnvironmentService],
})
export class ConfigModule {}
