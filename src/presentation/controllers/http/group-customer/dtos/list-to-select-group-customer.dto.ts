import { OmitType } from '@nestjs/swagger';
import { CreateGroupCustomerDto } from './create-group-customer.dto';
import { GroupCustomerType } from '@/domain/group-customer/types/group-customer.type'


export class ListToSelectGroupCustomerDto
  extends OmitType(CreateGroupCustomerDto, [])

  implements Partial<GroupCustomerType.Input> {}
