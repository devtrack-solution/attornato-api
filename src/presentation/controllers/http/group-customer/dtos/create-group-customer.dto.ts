import { GroupCustomerType } from '@/domain/group-customer/types/group-customer.type'
import { OmitType } from '@nestjs/swagger';
import { GroupCustomerDto } from '@/presentation/controllers/http/group-customer/dtos/group-customer.dto'

export class CreateGroupCustomerDto
  extends OmitType(GroupCustomerDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements GroupCustomerType.Input {}
