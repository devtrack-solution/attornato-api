import { Module } from '@nestjs/common'
import { ListClientInboundPortToken } from '@/domain/client/ports/inbound/list-client.inbound-port'
import { ListClientService } from '@/application/services/client/list-client.service'
import { ListToSelectClientInboundPortToken } from '@/domain/client/ports/inbound/list-to-select-client.inbound-port'
import { ListToSelectClientService } from '@/application/services/client/list-to-select-client.service'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: ListClientInboundPortToken,
      useClass: ListClientService,
    },
    {
      provide: ListToSelectClientInboundPortToken,
      useClass: ListToSelectClientService,
    },
  ],
  exports: [
    {
      provide: ListClientInboundPortToken,
      useClass: ListClientService,
    },
    {
      provide: ListToSelectClientInboundPortToken,
      useClass: ListToSelectClientService,
    },
  ],
})
export class ClientModule {}
