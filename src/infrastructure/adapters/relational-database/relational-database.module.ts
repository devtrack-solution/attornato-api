import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from '@/infrastructure/config/typeorm.config'
import { PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { PermissionRepository } from '@/infrastructure/adapters/relational-database/repositories/permission.repository'
import { GroupProcessRepository } from '@/infrastructure/adapters/relational-database/repositories/group-process.repository'
import { GroupProcessRepositoryOutboundPortSymbol } from '@/domain/process/component/group-process/ports/outbound/group-process-repository.outbound-port'
import { ResponsibleRepositoryOutboundPortSymbol } from '@/domain/process/component/responsible/ports/outbound/responsible-repository.outbound-port'
import { ResponsibleRepository } from '@/infrastructure/adapters/relational-database/repositories/responsible.repository'
import { PhaseRepository } from '@/infrastructure/adapters/relational-database/repositories/phase.repository'
import { PhaseRepositoryOutboundPortSymbol } from '@/domain/process/component/phase/ports/outbound/phase-repository.outbound-port'
import { CountyRepositoryOutboundPortSymbol } from '@/domain/process/component/county/ports/outbound/county-repository.outbound-port'
import { LocatorRepositoryOutboundPortSymbol } from '@/domain/process/component/locator/ports/outbound/locator-repository.outbound-port'
import { CountyRepository } from '@/infrastructure/adapters/relational-database/repositories/county.repository'
import { LocatorRepository } from '@/infrastructure/adapters/relational-database/repositories/locator.repository'
import { PracticeAreaRepositoryOutboundPortSymbol } from '@/domain/process/component/practice-area/ports/outbound/practice-area-repository.outbound-port'
import { ActionObjectRepositoryOutboundPortSymbol } from '@/domain/process/component/action-object/ports/outbound/action-object-repository.outbound-port'
import { ActionObjectRepository } from '@/infrastructure/adapters/relational-database/repositories/action-object.repository'
import { PracticeAreaRepository } from '@/infrastructure/adapters/relational-database/repositories/practice-area.repository'
import { ProceduralStatusRepositoryOutboundPortSymbol } from '@/domain/process/component/procedural-status/ports/outbound/procedural-status-repository.outbound-port'
import { SubjectRepositoryOutboundPortSymbol } from '@/domain/process/component/subject/ports/outbound/subject-repository.outbound-port'
import { SubjectRepository } from '@/infrastructure/adapters/relational-database/repositories/subject.repository'
import { ProceduralStatusRepository } from '@/infrastructure/adapters/relational-database/repositories/procedural-status.repository'
import { DetailRepositoryOutboundPortSymbol } from '@/domain/process/component/detail/ports/outbound/detail-repository.outbound-port'
import { DetailRepository } from '@/infrastructure/adapters/relational-database/repositories/detail.repository'
import { FreeFieldRepository } from '@/infrastructure/adapters/relational-database/repositories/free-field.repository'
import { FreeFieldRepositoryOutboundPortSymbol } from '@/domain/client/component/person/contact-person/free-field/ports/outbound/free-field-repository.outbound-port'
import { OriginRepositoryOutboundPortSymbol } from '@/domain/process/component/origin/ports/outbound/origin-repository.outbound-port'
import { OriginRepository } from '@/infrastructure/adapters/relational-database/repositories/origin.repository'
import { LocalProcedureNameRepositoryOutboundPortSymbol } from '@/domain/process/component/local-procedure-name/ports/outbound/local-procedure-name-repository.outbound-port'
import { LocalProcedureNameRepository } from '@/infrastructure/adapters/relational-database/repositories/local-procedure-name.repository'
import { GroupCustomerRepositoryOutboundPortSymbol } from '@/domain/client/component/group-customer/ports/outbound/group-customer-repository.outbound-port'
import { GroupCustomerRepository } from '@/infrastructure/adapters/relational-database/repositories/group-customer.repository'
import { ProfileRepositoryOutboundPortSymbol } from '@/domain/client/component/profile/ports/outbound/profile-repository.outbound-port'
import { ProfileRepository } from '@/infrastructure/adapters/relational-database/repositories/profile.repository'
import { CommunicationChannelRepository } from '@/infrastructure/adapters/relational-database/repositories/communication-channel.repository'
import { CommunicationChannelRepositoryOutboundPortSymbol } from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/outbound/communication-channel-repository.outbound-port'
import { DataSource, DataSourceOptions } from 'typeorm'
import { LegalRepositoryOutboundPortSymbol } from '@/domain/client/component/legal/ports/outbound/legal-repository.outbound-port'
import { LegalRepository } from '@/infrastructure/adapters/relational-database/repositories/legal.repository'
import { IndividualRepositoryOutboundPortSymbol } from '@/domain/client/component/individual/ports/outbound/individual-repository.outbound-port'
import { IndividualRepository } from '@/infrastructure/adapters/relational-database/repositories/individual.repository'
import { ClientRepository } from '@/infrastructure/adapters/relational-database/repositories/client.repository'
import { ProcessRepositoryOutboundPortSymbol } from '@/domain/process/ports/outbound/process-repository.outbound-port'
import { ProcessRepository } from '@/infrastructure/adapters/relational-database/repositories/process.repository'
import { FreeField6Repository } from '@/infrastructure/adapters/relational-database/repositories/free-field-6.repository'
import { FreeField1RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-1/ports/outbound/free-field-1-repository.outbound-port'
import { FreeField1Repository } from '@/infrastructure/adapters/relational-database/repositories/free-field-1.repository'
import { FreeField2RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-2/ports/outbound/free-field-2-repository.outbound-port'
import { FreeField2Repository } from '@/infrastructure/adapters/relational-database/repositories/free-field-2.repository'
import { FreeField6RepositoryOutboundPortSymbol } from '@/domain/process/component/process-detail/component/free-field-6/ports/outbound/free-field-6-repository.outbound-port'
import { JudicialRepositoryOutboundPortSymbol } from '@/domain/process/component/judicial/ports/outbound/judicial-repository.outbound-port'
import { JudicialRepository } from '@/infrastructure/adapters/relational-database/repositories/process-judicial.repository'
import { AdministrativeRepository } from '@/infrastructure/adapters/relational-database/repositories/process-administrative.repository'
import { AdministrativeRepositoryOutboundPortSymbol } from '@/domain/process/component/administrative/ports/outbound/administrative-repository.outbound-port'
import { ClientRepositoryOutboundPortSymbol } from '@/domain/client/ports/outbound/client-repository.outbound-port'
import { PreferenceRepositoryOutboundPortSymbol } from '@/domain/account/component/preference/ports/outbound/preference-repository.outbound-port'
import { PreferenceRepository } from '@/infrastructure/adapters/relational-database/repositories/preference.repository'
import { ConfigModule } from '@/infrastructure/config/config.module'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
import { AppConfigToken } from '@/domain/app-config.interface'
import { CredentialRepository } from '@/infrastructure/adapters/relational-database/repositories/credential.repository'
import {
  CredentialRepositoryOutboundPortSymbol
} from '@/domain/securities/ports/outbound/credential-repository.outbound-port'
import { AccountRepositoryOutboundPortSymbol } from '@/domain/account/ports/outbound/account-repository.outbound-port'
import { AccountRepository } from '@/infrastructure/adapters/relational-database/repositories/account.repository'
import {
  IdentifierRepositoryOutboundPortSymbol
} from '@/domain/identifier/ports/outbound/identifier-repository.outbound-port'
import { IdentifierRepository } from '@/infrastructure/adapters/relational-database/repositories/identifier.repository'
import {
  PartnerRepositoryOutboundPortSymbol
} from '@/domain/process/component/partner/ports/outbound/partner-repository.outbound-port'
import { PartnerRepository } from '@/infrastructure/adapters/relational-database/repositories/partner.repository'
import {
  PrognosisRepositoryOutboundPortSymbol
} from '@/domain/process/component/prognosis/ports/outbound/prognosis-repository.outbound-port'
import { PrognosisRepository } from '@/infrastructure/adapters/relational-database/repositories/prognosis.repository'
import { RoleRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/role-repository.outbound-port'
import { RoleRepository } from '@/infrastructure/adapters/relational-database/repositories/role.repository'
import {
  AccountPersonRepositoryOutboundPortSymbol
} from '@/domain/account/component/account-person/ports/outbound/account-person-repository.outbound-port'
import { AccountPersonRepository } from '@/infrastructure/adapters/relational-database/repositories/account-person.repository'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'pgsql',
      useFactory: async () => typeOrmConfig,
    }),
    TypeOrmModule.forFeature([]),
  ],
  providers: [
    {
      provide: AppConfigToken,
      useClass: ConfigEnvironmentService,
    },
    {
      provide: PermissionRepositoryOutboundPortSymbol,
      useClass: PermissionRepository,
    },
    {
      provide: GroupProcessRepositoryOutboundPortSymbol,
      useClass: GroupProcessRepository,
    },
    {
      provide: GroupCustomerRepositoryOutboundPortSymbol,
      useClass: GroupCustomerRepository,
    },
    {
      provide: ResponsibleRepositoryOutboundPortSymbol,
      useClass: ResponsibleRepository,
    },
    {
      provide: PhaseRepositoryOutboundPortSymbol,
      useClass: PhaseRepository,
    },
    {
      provide: CountyRepositoryOutboundPortSymbol,
      useClass: CountyRepository,
    },
    {
      provide: LocatorRepositoryOutboundPortSymbol,
      useClass: LocatorRepository,
    },
    {
      provide: PracticeAreaRepositoryOutboundPortSymbol,
      useClass: PracticeAreaRepository,
    },
    {
      provide: ActionObjectRepositoryOutboundPortSymbol,
      useClass: ActionObjectRepository,
    },
    {
      provide: SubjectRepositoryOutboundPortSymbol,
      useClass: SubjectRepository,
    },
    {
      provide: ProceduralStatusRepositoryOutboundPortSymbol,
      useClass: ProceduralStatusRepository,
    },
    {
      provide: DetailRepositoryOutboundPortSymbol,
      useClass: DetailRepository,
    },
    {
      provide: FreeFieldRepositoryOutboundPortSymbol,
      useClass: FreeFieldRepository,
    },
    {
      provide: OriginRepositoryOutboundPortSymbol,
      useClass: OriginRepository,
    },
    {
      provide: LocalProcedureNameRepositoryOutboundPortSymbol,
      useClass: LocalProcedureNameRepository,
    },
    {
      provide: ProfileRepositoryOutboundPortSymbol,
      useClass: ProfileRepository,
    },
    {
      provide: CommunicationChannelRepositoryOutboundPortSymbol,
      useClass: CommunicationChannelRepository,
    },
    {
      provide: LegalRepositoryOutboundPortSymbol,
      useClass: LegalRepository,
    },
    {
      provide: IndividualRepositoryOutboundPortSymbol,
      useClass: IndividualRepository,
    },
    {
      provide: ClientRepositoryOutboundPortSymbol,
      useClass: ClientRepository,
    },
    {
      provide: FreeField1RepositoryOutboundPortSymbol,
      useClass: FreeField1Repository,
    },
    {
      provide: FreeField2RepositoryOutboundPortSymbol,
      useClass: FreeField2Repository,
    },
    {
      provide: FreeField6RepositoryOutboundPortSymbol,
      useClass: FreeField6Repository,
    },
    {
      provide: ProcessRepositoryOutboundPortSymbol,
      useClass: ProcessRepository,
    },
    {
      provide: JudicialRepositoryOutboundPortSymbol,
      useClass: JudicialRepository,
    },
    {
      provide: AdministrativeRepositoryOutboundPortSymbol,
      useClass: AdministrativeRepository,
    },
    {
      provide: PreferenceRepositoryOutboundPortSymbol,
      useClass: PreferenceRepository,
    },
    {
      provide: CredentialRepositoryOutboundPortSymbol,
      useClass: CredentialRepository,
    },
    {
      provide: AccountRepositoryOutboundPortSymbol,
      useClass: AccountRepository,
    },
    {
      provide: IdentifierRepositoryOutboundPortSymbol,
      useClass: IdentifierRepository,
    },
    {
      provide: PartnerRepositoryOutboundPortSymbol,
      useClass: PartnerRepository,
    },
    {
      provide: PrognosisRepositoryOutboundPortSymbol,
      useClass: PrognosisRepository,
    },
    {
      provide: RoleRepositoryOutboundPortSymbol,
      useClass: RoleRepository,
    },
    {
      provide: AccountPersonRepositoryOutboundPortSymbol,
      useClass: AccountPersonRepository,
    },
  ],
  exports: [
    TypeOrmModule,
    {
      provide: AppConfigToken,
      useClass: ConfigEnvironmentService,
    },
    {
      provide: PermissionRepositoryOutboundPortSymbol,
      useClass: PermissionRepository,
    },
    {
      provide: GroupProcessRepositoryOutboundPortSymbol,
      useClass: GroupProcessRepository,
    },
    {
      provide: GroupCustomerRepositoryOutboundPortSymbol,
      useClass: GroupCustomerRepository,
    },
    {
      provide: ResponsibleRepositoryOutboundPortSymbol,
      useClass: ResponsibleRepository,
    },
    {
      provide: PhaseRepositoryOutboundPortSymbol,
      useClass: PhaseRepository,
    },
    {
      provide: CountyRepositoryOutboundPortSymbol,
      useClass: CountyRepository,
    },
    {
      provide: LocatorRepositoryOutboundPortSymbol,
      useClass: LocatorRepository,
    },
    {
      provide: PracticeAreaRepositoryOutboundPortSymbol,
      useClass: PracticeAreaRepository,
    },
    {
      provide: ActionObjectRepositoryOutboundPortSymbol,
      useClass: ActionObjectRepository,
    },
    {
      provide: SubjectRepositoryOutboundPortSymbol,
      useClass: SubjectRepository,
    },
    {
      provide: ProceduralStatusRepositoryOutboundPortSymbol,
      useClass: ProceduralStatusRepository,
    },
    {
      provide: DetailRepositoryOutboundPortSymbol,
      useClass: DetailRepository,
    },
    {
      provide: FreeFieldRepositoryOutboundPortSymbol,
      useClass: FreeFieldRepository,
    },
    {
      provide: OriginRepositoryOutboundPortSymbol,
      useClass: OriginRepository,
    },
    {
      provide: LocalProcedureNameRepositoryOutboundPortSymbol,
      useClass: LocalProcedureNameRepository,
    },
    {
      provide: ProfileRepositoryOutboundPortSymbol,
      useClass: ProfileRepository,
    },
    {
      provide: CommunicationChannelRepositoryOutboundPortSymbol,
      useClass: CommunicationChannelRepository,
    },
    {
      provide: LegalRepositoryOutboundPortSymbol,
      useClass: LegalRepository,
    },
    {
      provide: IndividualRepositoryOutboundPortSymbol,
      useClass: IndividualRepository,
    },
    {
      provide: ClientRepositoryOutboundPortSymbol,
      useClass: ClientRepository,
    },
    {
      provide: FreeField1RepositoryOutboundPortSymbol,
      useClass: FreeField1Repository,
    },
    {
      provide: FreeField2RepositoryOutboundPortSymbol,
      useClass: FreeField2Repository,
    },
    {
      provide: FreeField6RepositoryOutboundPortSymbol,
      useClass: FreeField6Repository,
    },
    {
      provide: ProcessRepositoryOutboundPortSymbol,
      useClass: ProcessRepository,
    },
    {
      provide: JudicialRepositoryOutboundPortSymbol,
      useClass: JudicialRepository,
    },
    {
      provide: AdministrativeRepositoryOutboundPortSymbol,
      useClass: AdministrativeRepository,
    },
    {
      provide: PreferenceRepositoryOutboundPortSymbol,
      useClass: PreferenceRepository,
    },
    {
      provide: CredentialRepositoryOutboundPortSymbol,
      useClass: CredentialRepository,
    },
    {
      provide: AccountRepositoryOutboundPortSymbol,
      useClass: AccountRepository,
    },
    {
      provide: IdentifierRepositoryOutboundPortSymbol,
      useClass: IdentifierRepository,
    },
    {
      provide: PartnerRepositoryOutboundPortSymbol,
      useClass: PartnerRepository,
    },
    {
      provide: PrognosisRepositoryOutboundPortSymbol,
      useClass: PrognosisRepository,
    },
    {
      provide: RoleRepositoryOutboundPortSymbol,
      useClass: RoleRepository,
    },
    {
      provide: AccountPersonRepositoryOutboundPortSymbol,
      useClass: AccountPersonRepository,
    },
  ],
})
export class RelationalDatabaseModule {}
