import { Module } from '@nestjs/common'
import { ProcessModule } from '@/application/services/process/process.module'
import { ProcessHttpController } from '@/presentation/controllers/http/process/process-http.controller'

@Module({
  imports: [
    ProcessModule
  ],
  controllers: [ProcessHttpController],
  exports: [],
})
export class ProcessHttpControllerModule {}
