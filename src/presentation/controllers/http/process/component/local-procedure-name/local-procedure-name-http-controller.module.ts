import { Module } from '@nestjs/common'
import {
  LocalProcedureNameHttpController
} from '@/presentation/controllers/http/process/component/local-procedure-name/local-procedure-name-http.controller'
import { LocalProcedureNameModule } from '@/application/services/process/component/local-procedure-name/local-procedure-name.module'

@Module({
  imports: [LocalProcedureNameModule],
  controllers: [LocalProcedureNameHttpController],
  exports: [],
})
export class LocalProcedureNameHttpControllerModule {}
