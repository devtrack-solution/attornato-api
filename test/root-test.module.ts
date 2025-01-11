import { Module } from '@nestjs/common'
import { AppService } from '@/app.service'
import { AppController } from '@/app.controller'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service' // Certifique-se do caminho correto
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ThrottlerModule.forRootAsync({
    inject: [ConfigLoaderService],
    useFactory: (configService: ConfigLoaderService) => ({
      throttlers: [
        {
          ttl: configService.loadConfig().throttling.ttl as number,
          limit: configService.loadConfig().throttling.limit as number,
        },
      ]
    }),
  }),InfrastructureModule],
  controllers: [AppController],
  providers: [    {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },AppService],
  exports: [AppService],
})
export class RootTestModule {}
