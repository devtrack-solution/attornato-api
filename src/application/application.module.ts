import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { PermissionModule } from '@/application/services/permission/permission.module'
import { ClientOrganizeModule } from '@/application/services/client/client-organize.module'
import { ProcessOrganizeModule } from '@/application/services/process/process-organize.module'
import { AccountOrganizeModule } from '@/application/services/account/account-organize.module'
import { RoleModule } from '@/application/services/role/use-cases/role.module'

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      maxListeners: 20,
    }),
    AccountOrganizeModule,
    ClientOrganizeModule,
    ProcessOrganizeModule,
    PermissionModule,
    RoleModule,
  ],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
