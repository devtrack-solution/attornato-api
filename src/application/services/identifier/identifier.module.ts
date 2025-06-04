import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { CreateIdentifierService } from './create-identifier.service'
import { LastIdentifierService } from '@/application/services/identifier/last-identifier.service'
import { CreateIdentifierInboundPortToken } from '@/domain/identifier/ports/inbound/create-identifier-responsible.inbound-port'
import { LastIdentifierInboundPortToken } from '@/domain/identifier/ports/inbound/last-identifier.inbound-port'

@Module({
  imports: [InfrastructureModule],
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
