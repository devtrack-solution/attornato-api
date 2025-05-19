import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { ClientDto } from './client.dto'

export class ListClientDto extends CriteriaPaginatedResponseDto<ClientDto> {
  @ApiProperty({ type: ClientDto, isArray: true })
  declare data: Partial<ClientDto>[]
}
