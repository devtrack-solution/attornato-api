import { Global, Module } from '@nestjs/common'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'
import { ThrottlerModule } from "@nestjs/throttler";

@Global()
@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [ConfigLoaderService],
      useFactory: (configService: ConfigLoaderService) => ({
        throttlers: [
          {
            ttl: configService.loadConfig().throttling.ttl as number,
            limit: configService.loadConfig().throttling.limit as number,
          },
        ]
      }),
    }),
  ],
  providers: [ConfigLoaderService],
  exports: [ConfigLoaderService],
})
export class InfrastructureModule {}
