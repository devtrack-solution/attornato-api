import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
import { AccountRepositoryOutboundPort, AccountRepositoryOutboundPortSymbol } from '@/domain/account/ports/outbound/account-repository.outbound-port'
import { isUUID } from 'validator'
import { AuthType } from '@/domain/securities/types/auth.type'

@Injectable()
export class OnboardingService {
  private config: AppConfig = new ConfigEnvironmentService()
  private readonly logger = new Logger(OnboardingService.name)

  constructor(
    @Inject(AccountRepositoryOutboundPortSymbol)
    private readonly accountRepository: AccountRepositoryOutboundPort,
    readonly jwtService: JwtService,
  ) {}

  async execute(data: AuthType.Onboarding): Promise<AuthType.Token> {
    try {
      if (!isUUID(data.roleId)) {
        throw new UnauthorizedException(`${data.roleId} is not UUID`)
      }
      const account = await this.accountRepository.findOneByCriteria({ id: data.accountId }, ['credential.roles.permissions', 'accountPerson', 'preferences'])
      if (!account) {
        throw new UnauthorizedException('no account found')
      }
      return await this.makeResponseAuth(account, data.roleId)
    } catch (e) {
      this.logger.error(e)
      throw e
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
      const payload = {
        profile: {
          accountId: account?.id,
          name: account?.accountPerson?.name,
          email: account?.credential?.username,
          avatar: account?.credential?.username,
          role: {
            ...selectedRole,
            permissions: selectedRole.permissions?.map((p: any) => p.name) ?? [],
          },
          preferences: account?.preferences,
        },
      }
      if (!payload.profile.role) {
        throw new UnauthorizedException()
      }

      const privateKey = Buffer.from(this.config.security.privateKey, 'base64').toString('utf-8')
      return this.jwtService.sign(payload, {
        algorithm: 'RS512',
        privateKey: privateKey,
        expiresIn: this.config.security.expirationToken,
      })
    } catch (e) {
      this.logger.error('MakeResponseAuth:', e)
      throw e
    }
  }
}
