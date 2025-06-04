import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { CreateCountyInboundPortToken } from '@/domain/process/component/county/ports/inbound/create-county.inbound-port'
import { DeleteCountyInboundPortToken } from '@/domain/process/component/county/ports/inbound/delete-county.inbound-port'
import { ListCountyInboundPortToken } from '@/domain/process/component/county/ports/inbound/list-county.inbound-port'
import { ListToSelectCountyInboundPortToken } from '@/domain/process/component/county/ports/inbound/list-to-select-county.inbound-port'
import { PatchCountyInboundPortToken } from '@/domain/process/component/county/ports/inbound/patch-county.inbound-port'
import { CreateCountyService } from './create-county.service'
import { DeleteCountyService } from './delete-county.service'
import { ListCountyService } from './list-county.service'
import { ListToSelectCountyService } from './list-to-select-county.service'
import { PatchCountyService } from './patch-county.service'

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: CreateCountyInboundPortToken,
      useClass: CreateCountyService,
    },
    {
      provide: DeleteCountyInboundPortToken,
      useClass: DeleteCountyService,
    },
    {
      provide: ListCountyInboundPortToken,
      useClass: ListCountyService,
    },
    {
      provide: ListToSelectCountyInboundPortToken,
      useClass: ListToSelectCountyService,
    },
    {
      provide: PatchCountyInboundPortToken,
      useClass: PatchCountyService,
    },
  ],
  exports: [
    {
      provide: CreateCountyInboundPortToken,
      useClass: CreateCountyService,
    },
    {
      provide: DeleteCountyInboundPortToken,
      useClass: DeleteCountyService,
    },
    {
      provide: ListCountyInboundPortToken,
      useClass: ListCountyService,
    },
    {
      provide: ListToSelectCountyInboundPortToken,
      useClass: ListToSelectCountyService,
    },
    {
      provide: PatchCountyInboundPortToken,
      useClass: PatchCountyService,
    },
  ],
})
export class CountyModule {}
