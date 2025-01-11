import { Global, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ConfigLoaderService } from "@/infrastructure/config/config-loader.service";

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
    InfrastructureModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService],
})
export class AppModule {}
