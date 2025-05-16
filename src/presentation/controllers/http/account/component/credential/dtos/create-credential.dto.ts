import { OmitType } from '@nestjs/swagger';
import { CredentialDto } from '@/presentation/controllers/http/account/component/credential/dtos/credential.dto'
import { CredentialType } from '@/domain/securities/types/credential.type'

export class CreateCredentialDto
  extends OmitType(CredentialDto, ['userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements CredentialType.Input {}
