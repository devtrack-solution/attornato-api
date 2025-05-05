import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { PermissionModule } from '@/application/services/permission/permission.module'
import { ProcessModule } from '@/application/services/process/process.module'
import { ClientOrganizeModule } from '@/application/services/client/client-organize.module'

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      maxListeners: 20,
    }),
    ClientOrganizeModule,
    PermissionModule,
    ProcessModule,
  ],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
