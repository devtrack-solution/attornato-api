import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreatePermissionInboundPortToken } from '@/domain/todo/ports/inbound/permission/create-permission.inbound-port'
import { CreatePermissionService } from '@/application/services/permission/create-permission.service'
import { DeletePermissionService } from '@/application/services/permission/delete-permission.service'
import { DeletePermissionInboundPortToken } from '@/domain/todo/ports/inbound/permission/delete-permission.inbound-port'
import { ListPermissionService } from '@/application/services/permission/list-permission.service'
import { UpdatePermissionInboundPortToken } from '@/domain/todo/ports/inbound/permission/update-permission.inbound-port'
import { UpdatePermissionService } from '@/application/services/permission/update-permission.service'
import { ListToSelectPermissionInboundPortToken } from '@/domain/todo/ports/inbound/permission/list-to-select-permission.inbound-port'
import { ListToSelectPermissionService } from '@/application/services/permission/list-to-select-permission.service'
import { PatchPermissionInboundPortToken } from '@/domain/todo/ports/inbound/permission/patch-permission.inbound-port'
import { PatchPermissionService } from '@/application/services/permission/patch-permission.service'
import { ListPermissionInboundPortToken } from '@/domain/securities/ports/inbound/component/permission/list-permission.inbound-port'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreatePermissionInboundPortToken,
      useClass: CreatePermissionService,
    },
    {
      provide: DeletePermissionInboundPortToken,
      useClass: DeletePermissionService,
    },
    {
      provide: ListPermissionInboundPortToken,
      useClass: ListPermissionService,
    },
    {
      provide: ListToSelectPermissionInboundPortToken,
      useClass: ListToSelectPermissionService,
    },
    {
      provide: UpdatePermissionInboundPortToken,
      useClass: UpdatePermissionService,
    },
    {
      provide: PatchPermissionInboundPortToken,
      useClass: PatchPermissionService,
    },
  ],
  exports: [
    {
      provide: CreatePermissionInboundPortToken,
      useClass: CreatePermissionService,
    },
    {
      provide: DeletePermissionInboundPortToken,
      useClass: DeletePermissionService,
    },
    {
      provide: ListPermissionInboundPortToken,
      useClass: ListPermissionService,
    },
    {
      provide: ListToSelectPermissionInboundPortToken,
      useClass: ListToSelectPermissionService,
    },
    {
      provide: UpdatePermissionInboundPortToken,
      useClass: UpdatePermissionService,
    },
    {
      provide: PatchPermissionInboundPortToken,
      useClass: PatchPermissionService,
    },
  ],
})
export class PermissionModule {}
