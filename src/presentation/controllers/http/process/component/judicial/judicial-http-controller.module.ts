import { JudicialModule } from '@/application/services/process/component/judicial/judicial.module'
import { Module } from '@nestjs/common'
import { JudicialHttpController } from './judicial-http.controller'

@Module({
  imports: [JudicialModule],
  controllers: [JudicialHttpController],
  exports: [],
})
export class JudicialHttpControllerModule {}
