import { Module } from '@nestjs/common'
import { ProfileModule } from '@/application/services/client/profile/profile.module'
import { ProfileHttpController } from '@/presentation/controllers/http/client/profile/profile-http.controller'
import { GroupCustomerModule } from '@/application/services/client/group-customer/group-customer.module'
import { IndividualModule } from '@/application/services/client/individual/individual.module'
import { LegalModule } from '@/application/services/client/legal/legal.module'
import { ActionObjectHttpControllerModule } from '@/presentation/controllers/http/action-object/action-object-http-controller.module'
import { ProfileHttpControllerModule } from '@/presentation/controllers/http/client/profile/profile-http-controller.module'
import { GroupCustomerHttpControllerModule } from '@/presentation/controllers/http/client/group-customer/group-customer-http-controller.module'
import { IndividualHttpControllerModule } from '@/presentation/controllers/http/client/individual/individual-http-controller.module'
import { LegalHttpControllerModule } from '@/presentation/controllers/http/client/legal/legal-http-controller.module'
import { FreeFieldHttpControllerModule } from '@/presentation/controllers/http/client/person/contact-person/free-field/free-field-http-controller.module'
import { CommunicationChannelHttpController } from '@/presentation/controllers/http/client/person/communication-address/contact/communication-channel/communication-channel-http.controller'
import { CommunicationChannelHttpControllerModule } from '@/presentation/controllers/http/client/person/communication-address/contact/communication-channel/communication-channel-http-controller.module'

@Module({
  imports: [
    CommunicationChannelHttpControllerModule,
    FreeFieldHttpControllerModule,
    GroupCustomerHttpControllerModule,
    IndividualHttpControllerModule,
    LegalHttpControllerModule,
    ProfileHttpControllerModule
  ],
  controllers: [],
  exports: [],
})
export class ClientHttpControllerModule {}
