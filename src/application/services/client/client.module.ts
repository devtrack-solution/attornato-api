import { Module } from '@nestjs/common'
import { FreeFieldModule } from '@/application/services/client/person/contact-person/free-field/free-field.module'
import { CommunicationChannelModule } from '@/application/services/client/person/communication-address/contact/communication-channel/communication-channel.module'
import { GroupCustomerModule } from '@/application/services/client/group-customer/group-customer.module'
import { IndividualModule } from '@/application/services/client/individual/individual.module'
import { IdentifierModule } from '@/application/services/client/identifier/identifier.module'
import { LegalModule } from '@/application/services/client/legal/legal.module'
import { ProfileModule } from '@/application/services/client/profile/profile.module'

@Module({
  imports: [
    CommunicationChannelModule,
    FreeFieldModule,
    GroupCustomerModule,
    IndividualModule,
    IdentifierModule,
    LegalModule,
    ProfileModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ClientModule {}
