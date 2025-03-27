import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { DeletePracticeAreaService } from '@/application/services/practice-area/delete-practice-area.service'
import {
  DeletePracticeAreaInboundPortToken
} from '@/domain/practice-area/ports/inbound/delete-practice-area.inbound-port'
import { CreatePracticeAreaService } from '@/application/services/practice-area/create-practice-area.service'
import { ListPracticeAreaInboundPortToken } from '@/domain/practice-area/ports/inbound/list-practice-area.inbound-port'
import { ListPracticeAreaService } from '@/application/services/practice-area/list-practice-area.service'
import {
  ListToSelectPracticeAreaInboundPortToken
} from '@/domain/practice-area/ports/inbound/list-to-select-practice-area.inbound-port'
import {
  ListToSelectPracticeAreaService
} from '@/application/services/practice-area/list-to-select-practice-area.service'
import { PatchPracticeAreaService } from '@/application/services/practice-area/patch-practice-area.service'
import {
  PatchPracticeAreaInboundPortToken
} from '@/domain/practice-area/ports/inbound/patch-practice-area.inbound-port'
import {
  CreatePracticeAreaInboundPortToken
} from '@/domain/practice-area/ports/inbound/create-practice-area.inbound-port'

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
