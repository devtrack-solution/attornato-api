import { Module } from '@nestjs/common'
import { CommunicationChannelModule } from '@/application/services/client/person/communication-address/contact/communication-channel/communication-channel.module'
import { CommunicationChannelHttpController } from '@/presentation/controllers/http/client/person/communication-address/contact/communication-channel/communication-channel-http.controller'

@Module({
  imports: [CommunicationChannelModule],
  controllers: [CommunicationChannelHttpController],
  exports: [],
})
export class CommunicationChannelHttpControllerModule {}
