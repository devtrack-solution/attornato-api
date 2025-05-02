import { OmitType } from '@nestjs/swagger';
import { CreateClientDto } from '@/presentation/controllers/http/client/dtos/create-client.dto'
import { ClientType } from '@/domain/client/types/client.type'


export class ListToSelectClientDto
  extends OmitType(CreateClientDto, [])

  implements Partial<ClientType.Input> {}
