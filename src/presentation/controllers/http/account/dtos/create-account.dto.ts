import { OmitType } from '@nestjs/swagger'
import { AccountDto } from './account.dto'
import { AccountType } from '@/domain/account/types/account.type'

export class CreateAccountDto extends OmitType(AccountDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements AccountType.Input {}
