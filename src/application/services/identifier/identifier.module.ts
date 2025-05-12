import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateIdentifierService } from './create-identifier.service'
import { LastIdentifierService } from '@/application/services/identifier/last-identifier.service'
import { CreateIdentifierInboundPortToken } from '@/domain/identifier/ports/inbound/create-identifier-responsible.inbound-port'
import { LastIdentifierInboundPortToken } from '@/domain/identifier/ports/inbound/last-identifier.inbound-port'

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
