import { OmitType } from '@nestjs/swagger';
import { GroupCustomerType } from '@/domain/client/group-customer/types/group-customer.type'
import {
  CreateGroupCustomerDto
} from '@/presentation/controllers/http/client/group-customer/dtos/create-group-customer.dto'

export class PatchGroupCustomerDto extends OmitType(CreateGroupCustomerDto, []) implements Partial<GroupCustomerType.Input> {}
