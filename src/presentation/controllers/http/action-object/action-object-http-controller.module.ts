import { Module } from '@nestjs/common'
import { ActionObjectModule } from '@/application/services/action-object/action-object.module'
import { ActionObjectHttpController } from '@/presentation/controllers/http/action-object/action-object-http.controller'

@Module({
  imports: [ActionObjectModule],
  controllers: [ActionObjectHttpController],
  exports: [],
})
export class ActionObjectHttpControllerModule {}
