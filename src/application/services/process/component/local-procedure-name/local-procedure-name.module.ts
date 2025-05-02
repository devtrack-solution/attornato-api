import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import {
  CreateLocalProcedureNameInboundPortToken
} from '@/domain/process/component/local-procedure-name/ports/inbound/create-local-procedure-name.inbound-port'
import {
  CreateLocalProcedureNameService
} from '@/application/services/process/component/local-procedure-name/create-local-procedure-name.service'
import {
  DeleteLocalProcedureNameInboundPortToken
} from '@/domain/process/component/local-procedure-name/ports/inbound/delete-local-procedure.name.inbound-port'
import {
  DeleteLocalProcedureNameService
} from '@/application/services/process/component/local-procedure-name/delete-local-procedure-name.service'
import {
  ListLocalProcedureNameInboundPortToken
} from '@/domain/process/component/local-procedure-name/ports/inbound/list-local-procedure-name.inbound-port'
import {
  ListLocalProcedureNameService
} from '@/application/services/process/component/local-procedure-name/list-local-procedure-name.service'
import {
  ListToSelectLocalProcedureNameInboundPortToken
} from '@/domain/process/component/local-procedure-name/ports/inbound/list-to-select-local-procedure-name.inbound-port'
import {
  ListToSelectLocalProcedureNameService
} from '@/application/services/process/component/local-procedure-name/list-to-select-local-procedure-name.service'
import {
  PatchLocalProcedureNameInboundPortToken
} from '@/domain/process/component/local-procedure-name/ports/inbound/patch-local-procedure-name.inbound-port'
import {
  PatchLocalProcedureNameService
} from '@/application/services/process/component/local-procedure-name/patch-local-procedure-name.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateLocalProcedureNameInboundPortToken,
      useClass: CreateLocalProcedureNameService,
    },
    {
      provide: DeleteLocalProcedureNameInboundPortToken,
      useClass: DeleteLocalProcedureNameService,
    },
    {
      provide: ListLocalProcedureNameInboundPortToken,
      useClass: ListLocalProcedureNameService,
    },
    {
      provide: ListToSelectLocalProcedureNameInboundPortToken,
      useClass: ListToSelectLocalProcedureNameService,
    },
    {
      provide: PatchLocalProcedureNameInboundPortToken,
      useClass: PatchLocalProcedureNameService,
    },
  ],
  exports: [
    {
      provide: CreateLocalProcedureNameInboundPortToken,
      useClass: CreateLocalProcedureNameService,
    },
    {
      provide: DeleteLocalProcedureNameInboundPortToken,
      useClass: DeleteLocalProcedureNameService,
    },
    {
      provide: ListLocalProcedureNameInboundPortToken,
      useClass: ListLocalProcedureNameService,
    },
    {
      provide: ListToSelectLocalProcedureNameInboundPortToken,
      useClass: ListToSelectLocalProcedureNameService,
    },
    {
      provide: PatchLocalProcedureNameInboundPortToken,
      useClass: PatchLocalProcedureNameService,
    },
  ],
})
export class LocalProcedureNameModule {}
