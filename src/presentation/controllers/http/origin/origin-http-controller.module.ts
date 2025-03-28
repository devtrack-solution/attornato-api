import { Module } from '@nestjs/common'
import { OriginHttpController } from './origin-http.controller';
import { OriginModule } from '@/application/services/origin/origin.module'

@Module({
  imports: [OriginModule],
  controllers: [OriginHttpController],
  exports: [],
})
export class OriginHttpControllerModule {}
