import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { LoginAuthInboundPort } from '@/domain/securities/ports/inbound/component/auth/login-auth.inbound-port'
import { AuthType } from '@/domain/securities/types/auth.type'
import { CredentialRepositoryOutboundPort, CredentialRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/credential-repository.outbound-port'
import { CredentialEntity } from '@/infrastructure/adapters/relational-database/entities/credential.entity'
import { JwtService } from '@nestjs/jwt'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
import { HashUtil } from '@/core/utils/hash.util'

@Injectable()
export class LoginService implements LoginAuthInboundPort {
  private config: AppConfig = new ConfigEnvironmentService()
  private readonly logger = new Logger(LoginService.name)

  constructor(
    @Inject(CredentialRepositoryOutboundPortSymbol)
    private readonly credentialRepository: CredentialRepositoryOutboundPort,
    readonly jwtService: JwtService,
  ) {}

  async execute(data: AuthType.LoginOutput): Promise<any> {
    try {
      const credential = await this.credentialRepository.login(data, ['roles', 'account'])
      if (!credential) {
        throw new UnauthorizedException(' - Username or password invalid!')
      }
      const validSession = await this.validateCredential({ passwordHash: credential.passwordHash! }, { password: data.password! })
      const auth: CredentialEntity = await this.makeResponseAuth(credential as CredentialEntity)
      if (validSession && auth !== null) {
        return auth
      } else {
        throw new UnauthorizedException('Username or password invalid!')
      }
    } catch (e) {
      this.logger.error(e)
      if (e instanceof UnauthorizedException) {
        throw e
      }
    }
  }

  async validateCredential(credential: { passwordHash: string }, data: { password: string }): Promise<boolean> {
    return HashUtil.compareHash(data.password, credential.passwordHash)
  }

  async makeResponseAuth(credential: CredentialEntity): Promise<any> {
    try {
      if (!credential.roles) {
        throw new UnauthorizedException('Notfound role')
      }

      const simplifiedRoles = credential.roles.map((role) => ({
        ...role,
        permissions: role.permissions?.map((p) => p.name) ?? [],
      }))
      const privateKey = Buffer.from(this.config.jwt.privateKeyBase64, 'base64').toString('utf-8')

      return this.jwtService.sign(
        {
          profile: {
            accountId: credential.account?.id,
            roles: simplifiedRoles,
          },
          accountId: credential.account?.id,
        },
        {
          algorithm: 'RS512',
          expiresIn: this.config.jwt.accessTokenExpInSec,
          privateKey,
        },
      )
    } catch (e) {
      this.logger.error('MakeResponseAuth:', e)
      throw e
    }
  }
}
