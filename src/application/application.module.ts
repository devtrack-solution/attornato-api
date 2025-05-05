import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { PermissionModule } from '@/application/services/permission/permission.module'
import { ClientOrganizeModule } from '@/application/services/client/client-organize.module'
import { ProcessOrganizeModule } from '@/application/services/process/process-organize.module'

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      maxListeners: 20,
    }),
    ClientOrganizeModule,
    ProcessOrganizeModule,
    PermissionModule,
  ],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
