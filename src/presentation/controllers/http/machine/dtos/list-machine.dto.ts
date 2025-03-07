import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { MachineDto } from '@/presentation/controllers/http/machine/dtos/machine.dto'

export class ListMachineDto extends CriteriaPaginatedResponseDto<MachineDto> {
  @ApiProperty({ type: MachineDto, isArray: true })
  declare data: Partial<MachineDto>[];
}