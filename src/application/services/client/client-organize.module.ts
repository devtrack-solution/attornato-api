import { Module } from '@nestjs/common'
import { FreeFieldModule } from '@/application/services/client/component/person/contact-person/free-field/free-field.module'
import { CommunicationChannelModule } from '@/application/services/client/component/person/communication-address/contact/communication-channel/communication-channel.module'
import { ProfileModule } from '@/application/services/client/component/profile/profile.module'
import { GroupCustomerModule } from '@/application/services/client/component/group-customer/group-customer.module'
import { IndividualModule } from '@/application/services/client/component/individual/individual.module'
import { IdentifierModule } from '@/application/services/client/component/identifier/identifier.module'
import { LegalModule } from '@/application/services/client/component/legal/legal.module'
import { ClientModule } from '@/application/services/client/client.module'

@Module({
  imports: [
    ClientModule,
    CommunicationChannelModule,
    FreeFieldModule,
    GroupCustomerModule,
    IndividualModule,
    IdentifierModule,
    LegalModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ClientOrganizeModule {}
