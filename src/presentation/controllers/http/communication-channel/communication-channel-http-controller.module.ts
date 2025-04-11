import { Module } from '@nestjs/common'
import { CommunicationChannelModule } from '@/application/services/communication-channel/communication-channel.module'
import { CommunicationChannelHttpController } from '@/presentation/controllers/http/communication-channel/communication-channel-http.controller'

@Module({
  imports: [CommunicationChannelModule],
  controllers: [CommunicationChannelHttpController],
  exports: [],
})
export class CommunicationChannelHttpControllerModule {}
