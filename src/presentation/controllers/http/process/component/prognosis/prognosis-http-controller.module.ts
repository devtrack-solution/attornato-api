import { Module } from '@nestjs/common'
import { PrognosisModule } from '@/application/services/process/component/prognosis/prognosis.module'
import { PrognosisHttpController } from '@/presentation/controllers/http/process/component/prognosis/prognosis-http.controller'

@Module({
  imports: [PrognosisModule],
  controllers: [PrognosisHttpController],
  exports: [],
})
export class PrognosisHttpControllerModule {}
