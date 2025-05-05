import { Module } from '@nestjs/common'
import { ProfileHttpControllerModule } from '@/presentation/controllers/http/client/component/profile/profile-http-controller.module'
import { GroupCustomerHttpControllerModule } from '@/presentation/controllers/http/client/component/group-customer/group-customer-http-controller.module'
import { IndividualHttpControllerModule } from '@/presentation/controllers/http/client/component/individual/individual-http-controller.module'
import { LegalHttpControllerModule } from '@/presentation/controllers/http/client/component/legal/legal-http-controller.module'
import { FreeFieldHttpControllerModule } from '@/presentation/controllers/http/client/component/person/contact-person/free-field/free-field-http-controller.module'
import { CommunicationChannelHttpControllerModule } from '@/presentation/controllers/http/client/component/person/communication-address/contact/communication-channel/communication-channel-http-controller.module'
import { IdentifierHttpControllerModule } from '@/presentation/controllers/http/client/component/identifier/identifier-http-controller.module'

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
