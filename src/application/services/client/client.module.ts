import { Module } from '@nestjs/common'
import { FreeFieldModule } from '@/application/services/client/component/person/contact-person/free-field/free-field.module'
import { CommunicationChannelModule } from '@/application/services/client/component/person/communication-address/contact/communication-channel/communication-channel.module'
import { ProfileModule } from '@/application/services/client/component/profile/profile.module'
import { ListClientInboundPortToken } from '@/domain/client/ports/inbound/list-client.inbound-port'
import { ListClientService } from '@/application/services/client/list-client.service'
import { ListToSelectClientInboundPortToken } from '@/domain/client/ports/inbound/list-to-select-client.inbound-port'
import { ListToSelectClientService } from '@/application/services/client/list-to-select-client.service'

@Module({
  imports: [],
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
