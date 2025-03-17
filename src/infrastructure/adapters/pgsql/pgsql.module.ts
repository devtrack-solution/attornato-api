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
  ],
})
export class PGSQLModule {}
