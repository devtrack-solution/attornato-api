import { Module } from '@nestjs/common'
import { PracticeAreaModule } from '@/application/services/practice-area/practice-area.module'
import { PracticeAreaHttpController } from '@/presentation/controllers/http/practice-area/practice-area-http.controller'

@Module({
  imports: [PracticeAreaModule],
  controllers: [PracticeAreaHttpController],
  exports: [],
})
export class PracticeAreaHttpControllerModule {}
