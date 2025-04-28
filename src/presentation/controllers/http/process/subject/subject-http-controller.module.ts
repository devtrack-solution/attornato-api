import { Module } from '@nestjs/common'
import { SubjectHttpController } from './subject-http.controller';
import { SubjectModule } from '@/application/services/process/subject/subject.module'

@Module({
  imports: [SubjectModule],
  controllers: [SubjectHttpController],
  exports: [],
})
export class SubjectHttpControllerModule {}
