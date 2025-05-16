import { OmitType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';
import { AccountType } from '@/domain/account/types/account.type'

export class PatchAccountDto extends OmitType(CreateAccountDto, []) implements Partial<AccountType.Input> {}
