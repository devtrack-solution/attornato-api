import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { ListIndividualInboundPortToken } from '@/domain/client/individual/ports/inbound/list-individual.inbound-port'
import { ListClientService } from './list-client.service'
import { ListLegalInboundPortToken } from '@/domain/client/legal/ports/inbound/list-legal.inbound-port'
import { ListLegalService } from '@/application/services/client/legal/list-legal.service'
import { ListClientInboundPortToken } from '@/domain/client/ports/inbound/list-client.inbound-port'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: ListClientInboundPortToken,
      useClass: ListClientService,
    },
  ],
  exports: [
    {
      provide: ListClientInboundPortToken,
      useClass: ListClientService,
    },
  ],
})
export class ClientModule {}
