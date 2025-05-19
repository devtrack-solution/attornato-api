import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { RoleDto } from '@/presentation/controllers/http/role/dtos/role.dto'

export class ListRoleDto extends CriteriaPaginatedResponseDto<RoleDto> {
  @ApiProperty({ type: RoleDto, isArray: true })
  declare data: Partial<RoleDto>[]
}
