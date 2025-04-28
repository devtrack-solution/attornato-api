import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { GroupCustomerDto } from '@/presentation/controllers/http/client/group-customer/dtos/group-customer.dto'

export class ListGroupCustomerDto extends CriteriaPaginatedResponseDto<GroupCustomerDto> {
  @ApiProperty({ type: GroupCustomerDto, isArray: true })
  declare data: Partial<GroupCustomerDto>[];
}
