import { Module } from '@nestjs/common'
import { FreeField1HttpController } from './free-field-1-http.controller'
import { FreeField1Module } from '@/application/services/process/component/judicial/component/free-field-1/free-field-1.module'

@Module({
  imports: [FreeField1Module],
  controllers: [FreeField1HttpController],
  exports: [],
})
export class FreeField1HttpControllerModule {}
