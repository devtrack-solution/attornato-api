import { Module } from '@nestjs/common'
import { PracticeAreaModule } from '@/application/services/process/component/practice-area/practice-area.module'
import { PracticeAreaHttpController } from '@/presentation/controllers/http/process/component/practice-area/practice-area-http.controller'

@Module({
  imports: [PracticeAreaModule],
  controllers: [PracticeAreaHttpController],
  exports: [],
})
export class PracticeAreaHttpControllerModule {}
