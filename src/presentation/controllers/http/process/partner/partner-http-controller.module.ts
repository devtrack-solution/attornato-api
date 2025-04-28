import { Module } from '@nestjs/common'
import { PartnerModule } from '@/application/services/process/partner/partner.module'
import { PartnerHttpController } from '@/presentation/controllers/http/process/partner/partner-http.controller'

@Module({
  imports: [PartnerModule],
  controllers: [PartnerHttpController],
  exports: [],
})
export class PartnerHttpControllerModule {}
