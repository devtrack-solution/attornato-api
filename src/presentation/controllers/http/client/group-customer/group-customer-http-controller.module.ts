import { Module } from '@nestjs/common'
import { GroupCustomerModule } from '@/application/services/client/group-customer/group-customer.module'
import { GroupCustomerHttpController } from '@/presentation/controllers/http/client/group-customer/group-customer-http.controller'

@Module({
  imports: [GroupCustomerModule],
  controllers: [GroupCustomerHttpController],
  exports: [],
})
export class GroupCustomerHttpControllerModule {}
