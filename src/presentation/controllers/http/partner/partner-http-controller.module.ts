import { Module } from '@nestjs/common'
import { PartnerModule } from '@/application/services/partner/partner.module'
import { PartnerHttpController } from '@/presentation/controllers/http/partner/partner-http.controller'

@Module({
  imports: [PartnerModule],
  controllers: [PartnerHttpController],
  exports: [],
})
export class PartnerHttpControllerModule {}
