import { Module } from '@nestjs/common'
import { LegalHttpController } from '@/presentation/controllers/http/client/component/legal/legal-http.controller'
import { LegalModule } from '@/application/services/client/component/legal/legal.module'

@Module({
  imports: [LegalModule],
  controllers: [LegalHttpController],
  exports: [],
})
export class LegalHttpControllerModule {}
