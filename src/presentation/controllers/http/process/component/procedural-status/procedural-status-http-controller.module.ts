import { Module } from '@nestjs/common'
import { ProceduralStatusModule } from '@/application/services/process/component/procedural-status/procedural-status.module'
import { ProceduralStatusHttpController } from '@/presentation/controllers/http/process/component/procedural-status/procedural-status-http.controller'

@Module({
  imports: [ProceduralStatusModule],
  controllers: [ProceduralStatusHttpController],
  exports: [],
})
export class ProceduralStatusHttpControllerModule {}
