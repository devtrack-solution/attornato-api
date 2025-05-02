import { Module } from '@nestjs/common'
import { FreeField6HttpController } from './free-field-6-http.controller'
import { FreeField6Module } from '@/application/services/process/component/judicial/component/free-field-6/free-field-6.module'

@Module({
  imports: [FreeField6Module],
  controllers: [FreeField6HttpController],
  exports: [],
})
export class FreeField6HttpControllerModule {}
