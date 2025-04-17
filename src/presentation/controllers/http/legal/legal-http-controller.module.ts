import { LegalModule } from '@/application/services/legal/legal.module';
import { Module } from '@nestjs/common'
import { LegalHttpController } from '@/presentation/controllers/http/legal/legal-http.controller'

@Module({
  imports: [LegalModule],
  controllers: [LegalHttpController],
  exports: [],
})
export class LegalHttpControllerModule {}
