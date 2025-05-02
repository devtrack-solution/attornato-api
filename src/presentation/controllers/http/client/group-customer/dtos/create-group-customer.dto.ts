import { GroupCustomerType } from '@/domain/client/component/group-customer/types/group-customer.type'
import { OmitType } from '@nestjs/swagger';
import { GroupCustomerDto } from '@/presentation/controllers/http/client/group-customer/dtos/group-customer.dto'

export class CreateGroupCustomerDto
  extends OmitType(GroupCustomerDto, ['userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements GroupCustomerType.Input {}
