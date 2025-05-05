import { OmitType } from '@nestjs/swagger';
import { GroupCustomerType } from '@/domain/client/component/group-customer/types/group-customer.type'
import {
  CreateGroupCustomerDto
} from '@/presentation/controllers/http/client/component/group-customer/dtos/create-group-customer.dto'

export class PatchGroupCustomerDto extends OmitType(CreateGroupCustomerDto, []) implements Partial<GroupCustomerType.Input> {}
