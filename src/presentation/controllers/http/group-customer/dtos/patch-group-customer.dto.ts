import { OmitType } from '@nestjs/swagger';
import { CreateGroupCustomerDto } from '@/presentation/controllers/http/group-customer/dtos/create-group-customer.dto'
import { GroupCustomerType } from '@/domain/group-customer/types/group-customer.type'

export class PatchGroupCustomerDto extends OmitType(CreateGroupCustomerDto, []) implements Partial<GroupCustomerType.Input> {}
