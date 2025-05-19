import { CountyModule } from '@/application/services/process/component/county/county.module'
import { Module } from '@nestjs/common'
import { CountyHttpController } from './county-http.controller'

@Module({
  imports: [CountyModule],
  controllers: [CountyHttpController],
  exports: [],
})
export class CountyHttpControllerModule {}
