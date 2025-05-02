import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateCommunicationChannelInboundPortToken } from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/inbound/create-communication-channel.inbound-port'
import { DeleteCommunicationChannelInboundPortToken } from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/inbound/delete-communication-channel.inbound-port'
import { CreateCommunicationChannelService } from '@/application/services/client/person/communication-address/contact/communication-channel/create-communication-channel.service'
import { DeleteCommunicationChannelService } from '@/application/services/client/person/communication-address/contact/communication-channel/delete-communication-channel.service'
import { ListCommunicationChannelService } from '@/application/services/client/person/communication-address/contact/communication-channel/list-communication-channel.service'
import { ListCommunicationChannelInboundPortToken } from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/inbound/list-communication-channel.inbound-port'
import { ListToSelectCommunicationChannelInboundPortToken } from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/inbound/list-to-select-communication-channel.inbound-port'
import { ListToSelectCommunicationChannelService } from '@/application/services/client/person/communication-address/contact/communication-channel/list-to-select-communication-channel.service'
import { PatchCommunicationChannelInboundPortToken } from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/inbound/patch-communication-channel.inbound-port'
import { PatchCommunicationChannelService } from '@/application/services/client/person/communication-address/contact/communication-channel/patch-communication-channel.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateCommunicationChannelInboundPortToken,
      useClass: CreateCommunicationChannelService,
    },
    {
      provide: DeleteCommunicationChannelInboundPortToken,
      useClass: DeleteCommunicationChannelService,
    },
    {
      provide: ListCommunicationChannelInboundPortToken,
      useClass: ListCommunicationChannelService,
    },
    {
      provide: ListToSelectCommunicationChannelInboundPortToken,
      useClass: ListToSelectCommunicationChannelService,
    },
    {
      provide: PatchCommunicationChannelInboundPortToken,
      useClass: PatchCommunicationChannelService,
    },
  ],
  exports: [
    {
      provide: CreateCommunicationChannelInboundPortToken,
      useClass: CreateCommunicationChannelService,
    },
    {
      provide: DeleteCommunicationChannelInboundPortToken,
      useClass: DeleteCommunicationChannelService,
    },
    {
      provide: ListCommunicationChannelInboundPortToken,
      useClass: ListCommunicationChannelService,
    },
    {
      provide: ListToSelectCommunicationChannelInboundPortToken,
      useClass: ListToSelectCommunicationChannelService,
    },
    {
      provide: PatchCommunicationChannelInboundPortToken,
      useClass: PatchCommunicationChannelService,
    },
  ],
})
export class CommunicationChannelModule {}
