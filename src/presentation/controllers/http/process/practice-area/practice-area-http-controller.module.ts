import { Module } from '@nestjs/common'
import { PracticeAreaModule } from '@/application/services/process/practice-area/practice-area.module'
import { PracticeAreaHttpController } from '@/presentation/controllers/http/process/practice-area/practice-area-http.controller'

@Module({
  imports: [PracticeAreaModule],
  controllers: [PracticeAreaHttpController],
  exports: [],
})
export class PracticeAreaHttpControllerModule {}
