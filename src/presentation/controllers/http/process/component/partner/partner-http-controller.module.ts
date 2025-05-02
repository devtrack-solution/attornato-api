import { Module } from '@nestjs/common'
import { PartnerModule } from '@/application/services/process/component/partner/partner.module'
import { PartnerHttpController } from '@/presentation/controllers/http/process/component/partner/partner-http.controller'

@Module({
  imports: [PartnerModule],
  controllers: [PartnerHttpController],
  exports: [],
})
export class PartnerHttpControllerModule {}
