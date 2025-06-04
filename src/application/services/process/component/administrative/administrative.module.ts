import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { CreateAdministrativeInboundPortToken } from '@/domain/process/component/administrative/ports/inbound/create-administrative-responsible.inbound-port'
import { DeleteAdministrativeInboundPortToken } from '@/domain/process/component/administrative/ports/inbound/delete-administrative.inbound-port'
import { ListAdministrativeInboundPortToken } from '@/domain/process/component/administrative/ports/inbound/list-administrative.inbound-port'
import { ListToSelectAdministrativeInboundPortToken } from '@/domain/process/component/administrative/ports/inbound/list-to-select-administrative.inbound-port'
import { PatchAdministrativeInboundPortToken } from '@/domain/process/component/administrative/ports/inbound/patch-administrative.inbound-port'
import { CreateAdministrativeService } from './create-administrative.service'
import { DeleteAdministrativeService } from './delete-administrative.service'
import { ListAdministrativeService } from './list-administrative.service'
import { ListToSelectAdministrativeService } from './list-to-select-administrative.service'
import { PatchAdministrativeService } from './patch-administrative.service'

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: CreateAdministrativeInboundPortToken,
      useClass: CreateAdministrativeService,
    },
    {
      provide: DeleteAdministrativeInboundPortToken,
      useClass: DeleteAdministrativeService,
    },
    {
      provide: ListAdministrativeInboundPortToken,
      useClass: ListAdministrativeService,
    },
    {
      provide: ListToSelectAdministrativeInboundPortToken,
      useClass: ListToSelectAdministrativeService,
    },
    {
      provide: PatchAdministrativeInboundPortToken,
      useClass: PatchAdministrativeService,
    },
  ],
  exports: [
    {
      provide: CreateAdministrativeInboundPortToken,
      useClass: CreateAdministrativeService,
    },
    {
      provide: DeleteAdministrativeInboundPortToken,
      useClass: DeleteAdministrativeService,
    },
    {
      provide: ListAdministrativeInboundPortToken,
      useClass: ListAdministrativeService,
    },
    {
      provide: ListToSelectAdministrativeInboundPortToken,
      useClass: ListToSelectAdministrativeService,
    },
    {
      provide: PatchAdministrativeInboundPortToken,
      useClass: PatchAdministrativeService,
    },
  ],
})
export class AdministrativeModule {}
