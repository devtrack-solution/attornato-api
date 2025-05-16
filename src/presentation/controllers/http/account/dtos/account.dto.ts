import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CreateAccountPersonDto } from '@/presentation/controllers/http/account/component/account-person/dtos/create-account-person.dto'
import { CreateCredentialDto } from '@/presentation/controllers/http/account/component/credential/dtos/create-credential.dto'

export class AccountDto extends BasicDto {
  @ApiProperty({ type: CreateAccountPersonDto })
  accountPerson!: CreateAccountPersonDto

  @ApiProperty({ type: CreateCredentialDto })
  credential!: CreateCredentialDto
}
