import { Module } from '@nestjs/common'
import { ProfileHttpControllerModule } from '@/presentation/controllers/http/client/profile/profile-http-controller.module'
import { GroupCustomerHttpControllerModule } from '@/presentation/controllers/http/client/group-customer/group-customer-http-controller.module'
import { IndividualHttpControllerModule } from '@/presentation/controllers/http/client/individual/individual-http-controller.module'
import { LegalHttpControllerModule } from '@/presentation/controllers/http/client/legal/legal-http-controller.module'
import { FreeFieldHttpControllerModule } from '@/presentation/controllers/http/client/person/contact-person/free-field/free-field-http-controller.module'
import { CommunicationChannelHttpControllerModule } from '@/presentation/controllers/http/client/person/communication-address/contact/communication-channel/communication-channel-http-controller.module'
import { IdentifierHttpControllerModule } from '@/presentation/controllers/http/client/identifier/identifier-http-controller.module'

@Module({
  imports: [
    CommunicationChannelHttpControllerModule,
    FreeFieldHttpControllerModule,
    GroupCustomerHttpControllerModule,
    IndividualHttpControllerModule,
    IdentifierHttpControllerModule,
    LegalHttpControllerModule,
    ProfileHttpControllerModule,
  ],
  controllers: [],
  exports: [],
})
export class ClientHttpControllerModule {}
