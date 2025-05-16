import { OmitType } from '@nestjs/swagger'
import { CredentialType } from '@/domain/securities/types/credential.type'
import { CredentialDto } from '@/presentation/controllers/http/account/component/credential/dtos/credential.dto'

export class PatchCredentialDto extends OmitType(CredentialDto, ['username']) implements Partial<CredentialType.Input> {}
