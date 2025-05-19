import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { DeletePracticeAreaService } from '@/application/services/process/component/practice-area/delete-practice-area.service'
import { DeletePracticeAreaInboundPortToken } from '@/domain/process/component/practice-area/ports/inbound/delete-practice-area.inbound-port'
import { CreatePracticeAreaService } from '@/application/services/process/component/practice-area/create-practice-area.service'
import { ListPracticeAreaInboundPortToken } from '@/domain/process/component/practice-area/ports/inbound/list-practice-area.inbound-port'
import { ListPracticeAreaService } from '@/application/services/process/component/practice-area/list-practice-area.service'
import { ListToSelectPracticeAreaInboundPortToken } from '@/domain/process/component/practice-area/ports/inbound/list-to-select-practice-area.inbound-port'
import { ListToSelectPracticeAreaService } from '@/application/services/process/component/practice-area/list-to-select-practice-area.service'
import { PatchPracticeAreaService } from '@/application/services/process/component/practice-area/patch-practice-area.service'
import { PatchPracticeAreaInboundPortToken } from '@/domain/process/component/practice-area/ports/inbound/patch-practice-area.inbound-port'
import { CreatePracticeAreaInboundPortToken } from '@/domain/process/component/practice-area/ports/inbound/create-practice-area.inbound-port'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreatePracticeAreaInboundPortToken,
      useClass: CreatePracticeAreaService,
    },
    {
      provide: DeletePracticeAreaInboundPortToken,
      useClass: DeletePracticeAreaService,
    },
    {
      provide: ListPracticeAreaInboundPortToken,
      useClass: ListPracticeAreaService,
    },
    {
      provide: ListToSelectPracticeAreaInboundPortToken,
      useClass: ListToSelectPracticeAreaService,
    },
    {
      provide: PatchPracticeAreaInboundPortToken,
      useClass: PatchPracticeAreaService,
    },
  ],
  exports: [
    {
      provide: CreatePracticeAreaInboundPortToken,
      useClass: CreatePracticeAreaService,
    },
    {
      provide: DeletePracticeAreaInboundPortToken,
      useClass: DeletePracticeAreaService,
    },
    {
      provide: ListPracticeAreaInboundPortToken,
      useClass: ListPracticeAreaService,
    },
    {
      provide: ListToSelectPracticeAreaInboundPortToken,
      useClass: ListToSelectPracticeAreaService,
    },
    {
      provide: PatchPracticeAreaInboundPortToken,
      useClass: PatchPracticeAreaService,
    },
  ],
})
export class PracticeAreaModule {}
