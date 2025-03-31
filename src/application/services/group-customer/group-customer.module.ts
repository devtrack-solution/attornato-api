import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateGroupCustomerInboundPortToken } from '@/domain/group-customer/ports/inbound/create-group-customer.inbound-port'
import { DeleteGroupCustomerInboundPortToken } from '@/domain/group-customer/ports/inbound/delete-group-customer.inbound-port'
import { CreateGroupCustomerService } from '@/application/services/group-customer/create-group-customer.service'
import { DeleteGroupCustomerService } from '@/application/services/group-customer/delete-group-customer.service'
import { ListGroupCustomerService } from '@/application/services/group-customer/list-group-customer.service'
import { ListGroupCustomerInboundPortToken } from '@/domain/group-customer/ports/inbound/list-group-customer.inbound-port'
import { ListToSelectGroupCustomerInboundPortToken } from '@/domain/group-customer/ports/inbound/list-to-select-group-customer.inbound-port'
import { ListToSelectGroupCustomerService } from '@/application/services/group-customer/list-to-select-group-customer.service'
import { PatchGroupCustomerInboundPortToken } from '@/domain/group-customer/ports/inbound/patch-group-customer.inbound-port'
import { PatchGroupCustomerService } from '@/application/services/group-customer/patch-group-customer.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateGroupCustomerInboundPortToken,
      useClass: CreateGroupCustomerService,
    },
    {
      provide: DeleteGroupCustomerInboundPortToken,
      useClass: DeleteGroupCustomerService,
    },
    {
      provide: ListGroupCustomerInboundPortToken,
      useClass: ListGroupCustomerService,
    },
    {
      provide: ListToSelectGroupCustomerInboundPortToken,
      useClass: ListToSelectGroupCustomerService,
    },
    {
      provide: PatchGroupCustomerInboundPortToken,
      useClass: PatchGroupCustomerService,
    },
  ],
  exports: [
    {
      provide: CreateGroupCustomerInboundPortToken,
      useClass: CreateGroupCustomerService,
    },
    {
      provide: DeleteGroupCustomerInboundPortToken,
      useClass: DeleteGroupCustomerService,
    },
    {
      provide: ListGroupCustomerInboundPortToken,
      useClass: ListGroupCustomerService,
    },
    {
      provide: ListToSelectGroupCustomerInboundPortToken,
      useClass: ListToSelectGroupCustomerService,
    },
    {
      provide: PatchGroupCustomerInboundPortToken,
      useClass: PatchGroupCustomerService,
    },
  ],
})
export class GroupCustomerModule {}
