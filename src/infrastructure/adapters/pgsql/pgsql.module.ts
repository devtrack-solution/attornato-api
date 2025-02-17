import { TodoRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { TodoRepository } from '@/infrastructure/adapters/pgsql/repositories/todo.repository'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from '@/infrastructure/config/typeorm.config'
import { PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { PermissionRepository } from '@/infrastructure/adapters/pgsql/repositories/permission.repository'

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
  ],
})
export class PGSQLModule {}
