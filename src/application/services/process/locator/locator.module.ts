import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateLocatorInboundPortToken } from '@/domain/process/locator/ports/inbound/create-locator.inbound-port'
import { DeleteLocatorInboundPortToken } from '@/domain/process/locator/ports/inbound/delete-locator.inbound-port'
import { ListLocatorInboundPortToken } from '@/domain/process/locator/ports/inbound/list-locator.inbound-port'
import { ListToSelectLocatorInboundPortToken } from '@/domain/process/locator/ports/inbound/list-to-select-locator.inbound-port'
import { PatchLocatorInboundPortToken } from '@/domain/process/locator/ports/inbound/patch-locator.inbound-port'
import { CreateLocatorService } from './create-locator.service'
import { DeleteLocatorService } from './delete-locator.service'
import { ListLocatorService } from './list-locator.service'
import { ListToSelectLocatorService } from './list-to-select-locator.service'
import { PatchLocatorService } from './patch-locator.service'

@Module({
  imports: [CoreModule],
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
