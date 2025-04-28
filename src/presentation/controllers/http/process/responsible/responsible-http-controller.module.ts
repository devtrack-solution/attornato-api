import { Module } from '@nestjs/common'
import { ResponsibleHttpController } from './responsible-http.controller';
import { ResponsibleModule } from '@/application/services/process/responsible/responsible.module';

@Module({
  imports: [ResponsibleModule],
  controllers: [ResponsibleHttpController],
  exports: [],
})
export class ResponsibleHttpControllerModule {}
