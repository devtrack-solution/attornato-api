import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { ListToSelectProceduralStatusService } from '@/application/services/process/component/procedural-status/list-to-select-procedural-status.service'
import { from } from 'rxjs'
import { CreateProceduralStatusInboundPortToken } from '@/domain/process/component/procedural-status/ports/inbound/create-procedural-status.inbound-port'
import { CreateProceduralStatusService } from '@/application/services/process/component/procedural-status/create-procedural-status.service'
import { DeleteProceduralStatusInboundPortToken } from '@/domain/process/component/procedural-status/ports/inbound/delete-procedural-status.inbound-port'
import { DeleteProceduralStatusService } from '@/application/services/process/component/procedural-status/delete-procedural-status.service'
import { ListProceduralStatusInboundPortToken } from '@/domain/process/component/procedural-status/ports/inbound/list-practice-area.inbound-port'
import { ListProceduralStatusService } from '@/application/services/process/component/procedural-status/list-procedural-status.service'
import { ListToSelectProceduralStatusInboundPortToken } from '@/domain/process/component/procedural-status/ports/inbound/list-to-select-practice-area.inbound-port'
import { PatchProceduralStatusInboundPortToken } from '@/domain/process/component/procedural-status/ports/inbound/patch-procedural-status.inbound-port'
import { PatchProceduralStatusService } from '@/application/services/process/component/procedural-status/patch-procedural-status.service'

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: CreateProceduralStatusInboundPortToken,
      useClass: CreateProceduralStatusService,
    },
    {
      provide: DeleteProceduralStatusInboundPortToken,
      useClass: DeleteProceduralStatusService,
    },
    {
      provide: ListProceduralStatusInboundPortToken,
      useClass: ListProceduralStatusService,
    },
    {
      provide: ListToSelectProceduralStatusInboundPortToken,
      useClass: ListToSelectProceduralStatusService,
    },
    {
      provide: PatchProceduralStatusInboundPortToken,
      useClass: PatchProceduralStatusService,
    },
  ],
  exports: [
    {
      provide: CreateProceduralStatusInboundPortToken,
      useClass: CreateProceduralStatusService,
    },
    {
      provide: DeleteProceduralStatusInboundPortToken,
      useClass: DeleteProceduralStatusService,
    },
    {
      provide: ListProceduralStatusInboundPortToken,
      useClass: ListProceduralStatusService,
    },
    {
      provide: ListToSelectProceduralStatusInboundPortToken,
      useClass: ListToSelectProceduralStatusService,
    },
    {
      provide: PatchProceduralStatusInboundPortToken,
      useClass: PatchProceduralStatusService,
    },
  ],
})
export class ProceduralStatusModule {}
