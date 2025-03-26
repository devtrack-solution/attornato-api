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
    }
  ],
})
export class PGSQLModule {}
