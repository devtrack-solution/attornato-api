import { Module } from '@nestjs/common'
import { FreeField2HttpController } from './free-field-2-http.controller'
import { FreeField2Module } from '@/application/services/process/component/free-field-2/free-field-2.module'

@Module({
  imports: [FreeField2Module],
  controllers: [FreeField2HttpController],
  exports: [],
})
export class FreeField2HttpControllerModule {}
