import { Module } from '@nestjs/common'
import { DetailHttpController } from './detail-http.controller'
import { DetailModule } from '@/application/services/process/component/detail/detail.module'

@Module({
  imports: [DetailModule],
  controllers: [DetailHttpController],
  exports: [],
})
export class DetailHttpControllerModule {}
