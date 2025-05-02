import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateIdentifierService } from './create-identifier.service'
import { CreateIdentifierInboundPortToken } from '@/domain/client/component/identifier/ports/inbound/create-identifier-responsible.inbound-port'
import { LastIdentifierInboundPortToken } from '@/domain/client/component/identifier/ports/inbound/last-identifier.inbound-port'
import { LastIdentifierService } from '@/application/services/client/identifier/last-identifier.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateIdentifierInboundPortToken,
      useClass: CreateIdentifierService,
    },
    {
      provide: LastIdentifierInboundPortToken,
      useClass: LastIdentifierService,
    },
  ],
  exports: [
    {
      provide: CreateIdentifierInboundPortToken,
      useClass: CreateIdentifierService,
    },
    {
      provide: LastIdentifierInboundPortToken,
      useClass: LastIdentifierService,
    },
  ],
})
export class IdentifierModule {}
