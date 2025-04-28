import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreatePrognosisInboundPortToken } from '@/domain/process/prognosis/ports/inbound/create-prognosis.inbound-port'
import { DeletePrognosisInboundPortToken } from '@/domain/process/prognosis/ports/inbound/delete-prognosis.inbound-port'
import { CreatePrognosisService } from '@/application/services/process/prognosis/create-prognosis.service'
import { DeletePrognosisService } from '@/application/services/process/prognosis/delete-prognosis.service'
import { ListPrognosisService } from '@/application/services/process/prognosis/list-prognosis.service'
import { ListPrognosisInboundPortToken } from '@/domain/process/prognosis/ports/inbound/list-prognosis.inbound-port'
import { ListToSelectPrognosisInboundPortToken } from '@/domain/process/prognosis/ports/inbound/list-to-select-prognosis.inbound-port'
import { ListToSelectPrognosisService } from '@/application/services/process/prognosis/list-to-select-prognosis.service'
import { PatchPrognosisInboundPortToken } from '@/domain/process/prognosis/ports/inbound/patch-prognosis.inbound-port'
import { PatchPrognosisService } from '@/application/services/process/prognosis/patch-prognosis.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreatePrognosisInboundPortToken,
      useClass: CreatePrognosisService,
    },
    {
      provide: DeletePrognosisInboundPortToken,
      useClass: DeletePrognosisService,
    },
    {
      provide: ListPrognosisInboundPortToken,
      useClass: ListPrognosisService,
    },
    {
      provide: ListToSelectPrognosisInboundPortToken,
      useClass: ListToSelectPrognosisService,
    },
    {
      provide: PatchPrognosisInboundPortToken,
      useClass: PatchPrognosisService,
    },
  ],
  exports: [
    {
      provide: CreatePrognosisInboundPortToken,
      useClass: CreatePrognosisService,
    },
    {
      provide: DeletePrognosisInboundPortToken,
      useClass: DeletePrognosisService,
    },
    {
      provide: ListPrognosisInboundPortToken,
      useClass: ListPrognosisService,
    },
    {
      provide: ListToSelectPrognosisInboundPortToken,
      useClass: ListToSelectPrognosisService,
    },
    {
      provide: PatchPrognosisInboundPortToken,
      useClass: PatchPrognosisService,
    },
  ],
})
export class PrognosisModule {}
