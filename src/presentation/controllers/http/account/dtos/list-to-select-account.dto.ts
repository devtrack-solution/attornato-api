import { OmitType } from '@nestjs/swagger';
import { CreateAccountDto } from '@/presentation/controllers/http/account/dtos/create-account.dto'
import { AccountType } from '@/domain/account/types/account.type'


export class ListToSelectAccountDto
  extends OmitType(CreateAccountDto, [])

  implements Partial<AccountType.Input> {}
