import { Global, Module } from '@nestjs/common'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'

@Global()
@Module({
  imports: [

  ],
  providers: [ConfigLoaderService],
  exports: [ConfigLoaderService],
})
export class InfrastructureModule {}
