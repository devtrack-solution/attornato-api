import { LegalModule } from '@/application/services/client/legal/legal.module';
import { Module } from '@nestjs/common'
import { LegalHttpController } from '@/presentation/controllers/http/client/legal/legal-http.controller'

@Module({
  imports: [LegalModule],
  controllers: [LegalHttpController],
  exports: [],
})
export class LegalHttpControllerModule {}
