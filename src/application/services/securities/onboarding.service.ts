import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { CredentialEntity } from '@/infrastructure/adapters/pgsql/entities/credential.entity'
import { JwtService } from '@nestjs/jwt'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
import { AccountRepositoryOutboundPort, AccountRepositoryOutboundPortSymbol } from '@/domain/account/ports/outbound/account-repository.outbound-port'
import { CreateAccountInboundPort } from '@/domain/account/ports/inbound/create-account.inbound-port'

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
      const subject = { accountId: account?.id }
      const payload = {
        profile: {
          accountId: account.account?.id,
          name: account?.accountPerson?.name,
          email: account?.credential?.username,
          avatar: account?.credential?.username,
          role: account?.credential?.roles?.map((role: any) => role.id == roleId),
          preferences: account?.preferences,
        },
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
