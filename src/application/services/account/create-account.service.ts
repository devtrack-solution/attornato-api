import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { AccountRepositoryOutboundPort, AccountRepositoryOutboundPortSymbol } from '@/domain/account/ports/outbound/account-repository.outbound-port'
import { CreateAccountInboundPort } from '@/domain/account/ports/inbound/create-account.inbound-port'
import { AccountType } from '@/domain/account/types/account.type'
import { Account } from '@/domain/account/business-objects/account.bo'
import { RoleRepositoryOutboundPort, RoleRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/role-repository.outbound-port'
import { RoleType } from '@/domain/securities/types/role.type'

@Injectable()
export class CreateAccountService implements CreateAccountInboundPort {
  private readonly logger = new Logger(CreateAccountService.name)
  constructor(
    @Inject(AccountRepositoryOutboundPortSymbol)
    private readonly accountRepository: AccountRepositoryOutboundPort,
    @Inject(RoleRepositoryOutboundPortSymbol)
    private readonly roleRepository: RoleRepositoryOutboundPort,
  ) {}

  async execute(data: AccountType.Input): Promise<AccountType.Output> {
    const roles = await this.findRoles(data.credential.roleIds!)

    const account = new Account({
      ...data,
      credential: {
        ...data.credential,
        roles
      },
    })
    await this.accountRepository.saveObjectWithRelations(account.toPersistence())
    return account.toJson()
  }

  async findRoles(ids: string[]): Promise<RoleType.Output[]> {
    const roles: RoleType.Output[] = []

    for (const id of ids) {
      const role = await this.roleRepository.findOneByCriteria({ id })
      if (role) roles.push(role as RoleType.Output)
    }

    if (roles.length < 1) {
      this.logger.error('findRoles')
      throw new NotFoundException('At least one role is required')
    }

    return roles
  }
}
