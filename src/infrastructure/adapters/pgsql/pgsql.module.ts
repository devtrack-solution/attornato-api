import { TodoRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { TodoRepository } from '@/infrastructure/adapters/pgsql/repositories/todo.repository'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from '@/infrastructure/config/typeorm.config'
import { PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { PermissionRepository } from '@/infrastructure/adapters/pgsql/repositories/permission.repository'
import {GroupProcessRepository} from "@/infrastructure/adapters/pgsql/repositories/group-process.repository";
import {
  GroupProcessRepositoryOutboundPortSymbol
} from "@/domain/group-process/ports/outbound/group-process-repository.outbound-port";
import { ResponsibleRepositoryOutboundPortSymbol } from '@/domain/responsible/ports/outbound/responsible-repository.outbound-port'
import { ResponsibleRepository } from './repositories/responsible.repository'
import { PhaseRepository } from './repositories/phase.repository'
import { PhaseRepositoryOutboundPortSymbol } from '@/domain/phase/ports/outbound/phase-repository.outbound-port'
import { CountyRepositoryOutboundPortSymbol } from '@/domain/county/ports/outbound/county-repository.outbound-port'
import { LocatorRepositoryOutboundPortSymbol } from '@/domain/locator/ports/outbound/locator-repository.outbound-port'
import { CountyRepository } from './repositories/county.repository'
import { LocatorRepository } from './repositories/locator.repository'
import {
  PracticeAreaRepositoryOutboundPortSymbol
} from '@/domain/practice-area/ports/outbound/practice-area-repository.outbound-port'
import {
  ActionObjectRepositoryOutboundPortSymbol
} from '@/domain/action-object/ports/outbound/action-object-repository.outbound-port'
import { ActionObjectRepository } from '@/infrastructure/adapters/pgsql/repositories/action-object.repository'
import { PracticeAreaRepository } from '@/infrastructure/adapters/pgsql/repositories/practice-area.repository'
import {
  ProceduralStatusRepositoryOutboundPortSymbol
} from '@/domain/procedural-status/ports/outbound/procedural-status-repository.outbound-port'
import { SubjectRepositoryOutboundPortSymbol } from '@/domain/subject/ports/outbound/subject-repository.outbound-port'
import { SubjectRepository } from '@/infrastructure/adapters/pgsql/repositories/subject.repository'
import { ProceduralStatusRepository } from '@/infrastructure/adapters/pgsql/repositories/procedural-status.repository'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'pgsql',
      useFactory: async () => typeOrmConfig,
    }),
  ],
  providers: [
    {
      provide: TodoRepositoryOutboundPortSymbol,
      useClass: TodoRepository,
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
    }
  ],
  exports: [
    {
      provide: TodoRepositoryOutboundPortSymbol,
      useClass: TodoRepository,
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
    }
  ],
})
export class PGSQLModule {}
