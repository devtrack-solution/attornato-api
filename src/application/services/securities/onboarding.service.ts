import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
import { AccountRepositoryOutboundPort, AccountRepositoryOutboundPortSymbol } from '@/domain/account/ports/outbound/account-repository.outbound-port'
import { CreateAccountInboundPort } from '@/domain/account/ports/inbound/create-account.inbound-port'
import { isUUID } from 'validator'

@Injectable()
export class OnboardingService implements CreateAccountInboundPort {
  private config: AppConfig = new ConfigEnvironmentService()
  private readonly logger = new Logger(OnboardingService.name)

  constructor(
    @Inject(AccountRepositoryOutboundPortSymbol)
    private readonly accountRepository: AccountRepositoryOutboundPort,
    readonly jwtService: JwtService,
  ) {}

  async execute(data: any): Promise<any> {
    try {
      if (!isUUID(data.roleId)) {
        throw new UnauthorizedException(`${data.roleId} is not UUID`)
      }
      const account = await this.accountRepository.findOneByCriteria({ id: data.accountId }, ['credential.roles.permissions', 'accountPerson', 'preferences'])
      return await this.makeResponseAuth(account, data.roleId)
    } catch (e) {
      this.logger.error(e)
      if (e instanceof UnauthorizedException) {
        throw e
      }
    }
  }

  async makeResponseAuth(account: any, roleId: string): Promise<any> {
    try {
      if (!account.credential.roles || !account.accountPerson || !account.credential || !account.preferences) {
        throw new UnauthorizedException('Notfound objects required for authentication')
      }
      const selectedRole = account?.credential?.roles?.find((role: any) => role.id === roleId)
      if (!selectedRole) {
        throw new UnauthorizedException('Not found role')
      }

      const subject = { accountId: account?.id }
      const payload = {
        profile: {
          accountId: account?.id,
          name: account?.accountPerson?.name,
          email: account?.credential?.username,
          avatar: account?.credential?.username,
          role: selectedRole,
          preferences: account?.preferences,
        },
      }
      if(!payload.profile.role) {
        throw new UnauthorizedException()
      }
      const accessTokenExpiresInSec = this.config.jwt.accessTokenExpInSec

      const privateKey = Buffer.from(this.config.jwt.privateKeyBase64, 'base64').toString('utf-8')

      return {
        token: this.jwtService.sign(
          { ...payload, ...subject },
          {
            expiresIn: accessTokenExpiresInSec,
            secret: privateKey,
            algorithm: 'RS512',
          },
        ),
      }
    } catch (e) {
      this.logger.error('MakeResponseAuth:', e)
      throw e
    }
  }
}
