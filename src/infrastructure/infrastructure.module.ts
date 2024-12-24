import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => {
          const configLoader = new ConfigLoaderService()
          return configLoader.loadConfig()
        },
      ],
      cache: true,
    }),
  ],
  providers: [ConfigLoaderService],
  exports: [ConfigLoaderService],
})
export class InfrastructureModule {}
