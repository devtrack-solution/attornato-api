import { OmitType } from '@nestjs/swagger'
import { CreateClientDto } from './create-client.dto'
import { ClientType } from '@/domain/client/types/client.type'

export class PatchClientDto extends OmitType(CreateClientDto, []) implements Partial<ClientType.Input> {}
