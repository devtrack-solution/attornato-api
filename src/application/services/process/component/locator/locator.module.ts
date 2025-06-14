import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { CreateLocatorInboundPortToken } from '@/domain/process/component/locator/ports/inbound/create-locator.inbound-port'
import { DeleteLocatorInboundPortToken } from '@/domain/process/component/locator/ports/inbound/delete-locator.inbound-port'
import { ListLocatorInboundPortToken } from '@/domain/process/component/locator/ports/inbound/list-locator.inbound-port'
import { ListToSelectLocatorInboundPortToken } from '@/domain/process/component/locator/ports/inbound/list-to-select-locator.inbound-port'
import { PatchLocatorInboundPortToken } from '@/domain/process/component/locator/ports/inbound/patch-locator.inbound-port'
import { CreateLocatorService } from './create-locator.service'
import { DeleteLocatorService } from './delete-locator.service'
import { ListLocatorService } from './list-locator.service'
import { ListToSelectLocatorService } from './list-to-select-locator.service'
import { PatchLocatorService } from './patch-locator.service'

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: CreateLocatorInboundPortToken,
      useClass: CreateLocatorService,
    },
    {
      provide: DeleteLocatorInboundPortToken,
      useClass: DeleteLocatorService,
    },
    {
      provide: ListLocatorInboundPortToken,
      useClass: ListLocatorService,
    },
    {
      provide: ListToSelectLocatorInboundPortToken,
      useClass: ListToSelectLocatorService,
    },
    {
      provide: PatchLocatorInboundPortToken,
      useClass: PatchLocatorService,
    },
  ],
  exports: [
    {
      provide: CreateLocatorInboundPortToken,
      useClass: CreateLocatorService,
    },
    {
      provide: DeleteLocatorInboundPortToken,
      useClass: DeleteLocatorService,
    },
    {
      provide: ListLocatorInboundPortToken,
      useClass: ListLocatorService,
    },
    {
      provide: ListToSelectLocatorInboundPortToken,
      useClass: ListToSelectLocatorService,
    },
    {
      provide: PatchLocatorInboundPortToken,
      useClass: PatchLocatorService,
    },
  ],
})
export class LocatorModule {}
