import { Module } from '@nestjs/common'
import { ActionObjectModule } from '@/application/services/process/component/action-object/action-object.module'
import { ActionObjectHttpController } from '@/presentation/controllers/http/process/component/action-object/action-object-http.controller'

@Module({
  imports: [ActionObjectModule],
  controllers: [ActionObjectHttpController],
  exports: [],
})
export class ActionObjectHttpControllerModule {}
