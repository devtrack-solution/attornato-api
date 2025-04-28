import { LocatorModule } from '@/application/services/process/locator/locator.module';
import { Module } from '@nestjs/common'
import { LocatorHttpController } from './locator-http.controller';

@Module({
  imports: [LocatorModule],
  controllers: [LocatorHttpController],
  exports: [],
})
export class LocatorHttpControllerModule {}
