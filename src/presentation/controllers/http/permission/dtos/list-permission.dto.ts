import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { PermissionDto } from '@/presentation/controllers/http/permission/dtos/permission.dto'

export class ListPermissionDto extends CriteriaPaginatedResponseDto<PermissionDto> {
  @ApiProperty({ type: PermissionDto, isArray: true })
  declare data: Partial<PermissionDto>[]
}
