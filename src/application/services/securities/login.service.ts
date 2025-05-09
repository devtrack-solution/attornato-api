import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { LoginAuthInboundPort } from '@/domain/securities/ports/inbound/login-auth.inbound-port'
import { AuthType } from '@/domain/securities/types/auth.type'
import { CredentialRepositoryOutboundPort, CredentialRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/credential-repository.outbound-port'
import { compareSync, hashSync } from 'bcrypt-nodejs'
import { CredentialEntity } from '@/infrastructure/adapters/pgsql/entities/credential.entity'
import { JwtService } from '@nestjs/jwt'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'

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
    return compareSync(data.password, credential.passwordHash)
  }

  async makeResponseAuth(credential: CredentialEntity): Promise<any> {
    try {
      if (!credential.roles) {
        throw new UnauthorizedException('Notfound role')
      }
      const subject = { accountId: credential.account?.id }
      const payload = {
        roles: credential.roles,
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
        profile: {
          accountId: credential.account?.id,
          roles: credential.roles,
        },
      }
    } catch (e) {
      this.logger.error('MakeResponseAuth:', e)
      throw e
    }
  }

}
