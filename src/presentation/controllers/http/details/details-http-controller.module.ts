import { Module } from '@nestjs/common'
import { DetailsHttpController } from './details-http.controller';
import { DetailsModule } from '@/application/services/details/details.module'

@Module({
  imports: [DetailsModule],
  controllers: [DetailsHttpController],
  exports: [],
})
export class DetailsHttpControllerModule {}
