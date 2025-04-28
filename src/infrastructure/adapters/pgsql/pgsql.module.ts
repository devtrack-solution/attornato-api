import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from '@/infrastructure/config/typeorm.config'
import { PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { PermissionRepository } from '@/infrastructure/adapters/pgsql/repositories/permission.repository'
import { GroupProcessRepository } from '@/infrastructure/adapters/pgsql/repositories/group-process.repository'
import { GroupProcessRepositoryOutboundPortSymbol } from '@/domain/process/group-process/ports/outbound/group-process-repository.outbound-port'
import { ResponsibleRepositoryOutboundPortSymbol } from '@/domain/process/responsible/ports/outbound/responsible-repository.outbound-port'
import { ResponsibleRepository } from './repositories/responsible.repository'
import { PhaseRepository } from './repositories/phase.repository'
import { PhaseRepositoryOutboundPortSymbol } from '@/domain/process/phase/ports/outbound/phase-repository.outbound-port'
import { CountyRepositoryOutboundPortSymbol } from '@/domain/process/county/ports/outbound/county-repository.outbound-port'
import { LocatorRepositoryOutboundPortSymbol } from '@/domain/process/locator/ports/outbound/locator-repository.outbound-port'
import { CountyRepository } from './repositories/county.repository'
import { LocatorRepository } from './repositories/locator.repository'
import { PracticeAreaRepositoryOutboundPortSymbol } from '@/domain/process/practice-area/ports/outbound/practice-area-repository.outbound-port'
import { ActionObjectRepositoryOutboundPortSymbol } from '@/domain/process/action-object/ports/outbound/action-object-repository.outbound-port'
import { ActionObjectRepository } from '@/infrastructure/adapters/pgsql/repositories/action-object.repository'
import { PracticeAreaRepository } from '@/infrastructure/adapters/pgsql/repositories/practice-area.repository'
import { ProceduralStatusRepositoryOutboundPortSymbol } from '@/domain/process/procedural-status/ports/outbound/procedural-status-repository.outbound-port'
import { SubjectRepositoryOutboundPortSymbol } from '@/domain/process/subject/ports/outbound/subject-repository.outbound-port'
import { SubjectRepository } from '@/infrastructure/adapters/pgsql/repositories/subject.repository'
import { ProceduralStatusRepository } from '@/infrastructure/adapters/pgsql/repositories/procedural-status.repository'
import { DetailsRepositoryOutboundPortSymbol } from '@/domain/process/details/ports/outbound/details-repository.outbound-port'
import { DetailsRepository } from '@/infrastructure/adapters/pgsql/repositories/details.repository'
import { FreeFieldRepository } from '@/infrastructure/adapters/pgsql/repositories/free-field.repository'
import { FreeFieldRepositoryOutboundPortSymbol } from '@/domain/client/person/contact-person/free-field/ports/outbound/free-field-repository.outbound-port'
import { OriginRepositoryOutboundPortSymbol } from '@/domain/process/origin/ports/outbound/origin-repository.outbound-port'
import { OriginRepository } from '@/infrastructure/adapters/pgsql/repositories/origin.repository'
import { LocalProcedureNameRepositoryOutboundPortSymbol } from '@/domain/process/local-procedure-name/ports/outbound/local-procedure-name-repository.outbound-port'
import { LocalProcedureNameRepository } from '@/infrastructure/adapters/pgsql/repositories/local-procedure-name.repository'
import { GroupCustomerRepositoryOutboundPortSymbol } from '@/domain/client/group-customer/ports/outbound/group-customer-repository.outbound-port'
import { GroupCustomerRepository } from '@/infrastructure/adapters/pgsql/repositories/group-customer.repository'
import { ProfileRepositoryOutboundPortSymbol } from '@/domain/client/profile/ports/outbound/profile-repository.outbound-port'
import { ProfileRepository } from '@/infrastructure/adapters/pgsql/repositories/profile.repository'
import { CommunicationChannelRepository } from '@/infrastructure/adapters/pgsql/repositories/communication-channel.repository'
import { CommunicationChannelRepositoryOutboundPortSymbol } from '@/domain/client/person/communication-address/contact/communication-channel/ports/outbound/communication-channel-repository.outbound-port'
import { DataSource, DataSourceOptions } from 'typeorm'
import { LegalRepositoryOutboundPortSymbol } from '@/domain/client/legal/ports/outbound/legal-repository.outbound-port'
import { LegalRepository } from '@/infrastructure/adapters/pgsql/repositories/legal.repository'
import { IndividualRepositoryOutboundPortSymbol } from '@/domain/client/individual/ports/outbound/individual-repository.outbound-port'
import { IndividualRepository } from '@/infrastructure/adapters/pgsql/repositories/individual.repository'
import { IdentifierRepositoryOutboundPortSymbol } from '@/domain/client/identifier/ports/outbound/identifier-repository.outbound-port'
import { IdentifierRepository } from '@/infrastructure/adapters/pgsql/repositories/identifier.repository'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'pgsql',
      useFactory: async () => typeOrmConfig,
    }),
  ],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        const dataSource = new DataSource(<DataSourceOptions>typeOrmConfig)
        return dataSource.initialize()
      },
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
      provide: DetailsRepositoryOutboundPortSymbol,
      useClass: DetailsRepository,
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
  ],
  exports: [
    DataSource,
    TypeOrmModule,
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
      provide: DetailsRepositoryOutboundPortSymbol,
      useClass: DetailsRepository,
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
  ],
})
export class PGSQLModule {}
