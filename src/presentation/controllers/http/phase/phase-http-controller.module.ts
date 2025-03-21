import { PhaseModule } from '@/application/services/phase/phase.module';
import { Module } from '@nestjs/common'
import { PhaseHttpController } from './phase-http.controller';

@Module({
  imports: [PhaseModule],
  controllers: [PhaseHttpController],
  exports: [],
})
export class PhaseHttpControllerModule {}
