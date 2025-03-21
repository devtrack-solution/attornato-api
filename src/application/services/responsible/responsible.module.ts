import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateResponsibleInboundPortToken } from '@/domain/responsible/ports/inbound/create-responsible.inbound-port'
import { CreateResponsibleService } from './crete-responsible.service'
import { DeleteResponsibleInboundPortToken } from '@/domain/responsible/ports/inbound/delete-responsible.inbound-port'
import { ListResponsibleInboundPortToken } from '@/domain/responsible/ports/inbound/list-responsible.inbound-port'
import { ListToSelectResponsibleInboundPortToken } from '@/domain/responsible/ports/inbound/list-to-select-responsible.inbound-port'
import { PatchResponsibleInboundPortToken } from '@/domain/responsible/ports/inbound/patch-responsible.inbound-port'
import { DeleteResponsibleService } from './delete-responsible.service'
import { ListResponsibleService } from './list-responsible.service'
import { ListToSelectResponsibleService } from './list-to-select-responsible.service'
import { PatchResponsibleService } from './patch-responsible.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide:CreateResponsibleInboundPortToken,
      useClass:CreateResponsibleService,
    },
    {
      provide: DeleteResponsibleInboundPortToken,
      useClass: DeleteResponsibleService,
    },
    {
      provide: ListResponsibleInboundPortToken,
      useClass: ListResponsibleService,
    },
    {
      provide: ListToSelectResponsibleInboundPortToken,
      useClass: ListToSelectResponsibleService,
    },
    {
      provide: PatchResponsibleInboundPortToken,
      useClass: PatchResponsibleService,
    },
  ],
  exports: [
    {
      provide:CreateResponsibleInboundPortToken,
      useClass:CreateResponsibleService,
    },
    {
      provide: DeleteResponsibleInboundPortToken,
      useClass: DeleteResponsibleService,
    },
    {
      provide: ListResponsibleInboundPortToken,
      useClass: ListResponsibleService,
    },
    {
      provide: ListToSelectResponsibleInboundPortToken,
      useClass: ListToSelectResponsibleService,
    },
    {
      provide: PatchResponsibleInboundPortToken,
      useClass: PatchResponsibleService,
    },
  ],
})
export class ResponsibleModule {}
