import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateRoleInboundPortToken } from '@/domain/securities/ports/inbound/component/role/create-role.inbound-port'
import { CreateRoleService } from '@/application/services/role/use-cases/create-role.service'
import { DeleteRoleInboundPortToken } from '@/domain/securities/ports/inbound/component/role/delete-role.inbound-port'
import { DeleteRoleService } from '@/application/services/role/use-cases/delete-role.service'
import { ListRoleInboundPortToken } from '@/domain/securities/ports/inbound/component/role/list-role.inbound-port'
import { ListRoleService } from '@/application/services/role/use-cases/list-role.service'
import { ListToSelectRoleInboundPortToken } from '@/domain/securities/ports/inbound/component/role/list-to-select-role.inbound-port'
import { ListToSelectRoleService } from '@/application/services/role/use-cases/list-to-select-role.service'
import { PatchRoleInboundPortToken } from '@/domain/securities/ports/inbound/component/role/patch-role.inbound-port'
import { PatchRoleService } from '@/application/services/role/use-cases/patch-role.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateRoleInboundPortToken,
      useClass: CreateRoleService,
    },
    {
      provide: DeleteRoleInboundPortToken,
      useClass: DeleteRoleService,
    },
    {
      provide: ListRoleInboundPortToken,
      useClass: ListRoleService,
    },
    {
      provide: ListToSelectRoleInboundPortToken,
      useClass: ListToSelectRoleService,
    },
    {
      provide: PatchRoleInboundPortToken,
      useClass: PatchRoleService,
    },
  ],
  exports: [
    {
      provide: CreateRoleInboundPortToken,
      useClass: CreateRoleService,
    },
    {
      provide: DeleteRoleInboundPortToken,
      useClass: DeleteRoleService,
    },
    {
      provide: ListRoleInboundPortToken,
      useClass: ListRoleService,
    },
    {
      provide: ListToSelectRoleInboundPortToken,
      useClass: ListToSelectRoleService,
    },
    {
      provide: PatchRoleInboundPortToken,
      useClass: PatchRoleService,
    },
  ],
})
export class RoleModule {}
