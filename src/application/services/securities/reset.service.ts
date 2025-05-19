import { BadRequestException, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { AuthType } from '@/domain/securities/types/auth.type'
import { CredentialRepositoryOutboundPort, CredentialRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/credential-repository.outbound-port'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
import { MailSenderService, MailSenderServiceSymbol } from '@/infrastructure/adapters/aws/services/mail-sender.service'
import { MODIFY_DATA } from '@/infrastructure/adapters/aws/services/email.properties'
import { CredentialEntity } from '@/infrastructure/adapters/pgsql/entities/credential.entity'
import { DateTime } from 'luxon'
import { ResetAuthInboundPort } from '@/domain/securities/ports/inbound/component/auth/reset-auth.inbound-port'
import { HashUtil } from '@/core/utils/hash.util'

@Injectable()
export class ResetService implements ResetAuthInboundPort {
  private config: AppConfig = new ConfigEnvironmentService()
  private readonly logger = new Logger(ResetService.name)

  constructor(
    @Inject(CredentialRepositoryOutboundPortSymbol)
    private readonly credentialRepository: CredentialRepositoryOutboundPort,
    @Inject(MailSenderServiceSymbol)
    protected readonly mailSenderService: MailSenderService,
  ) {}

  async execute(data: AuthType.ResetPasswordInput): Promise<any> {
    try {
      this.comparePassword(data.password, data.passwordConfirm)

      const credential = await this.credentialRepository.findByUsername({ username: data.username! })
      if (!credential) {
        throw new UnauthorizedException('Notfound user')
      }
      if (!await HashUtil.compareHash(data.forgotCode, credential.resetPasswordCode as string)) {
        throw new NotFoundException('Código inválido')
      }

      if (credential.expiredCodeAt === null) {
        throw new NotFoundException('Código expirado')
      }

      const nowTime = DateTime.now().setZone('America/Sao_Paulo')
      const expiredCodeAt = DateTime.fromJSDate(credential.expiredCodeAt!).setZone('America/Sao_Paulo')

      if (expiredCodeAt.toMillis() < nowTime.toMillis()) {
        throw new NotFoundException('- Código expirado -')
      }
      data.password = HashUtil.generateHash(data.password)

      await this.credentialRepository.patchObject(
        {
          passwordHash: data.password,
          resetPasswordCode: null,
          resetPasswordToken: null,
          requestNewPassword: false,
        },
        { id: credential.id! },
        CredentialEntity,
      )

      try {
        await this.mailSenderService.send({
          subject: 'Recuperação senha!',
          to: [credential.username!],
          from: this.config.aws.ses.from,
          html: MODIFY_DATA(),
        })
      } catch (e) {
        this.logger.warn('SendMail', e)
      }
    } catch (e) {
      this.logger.error(e)
      if (e instanceof UnauthorizedException || NotFoundException || BadRequestException) {
        throw e
      }
    }
  }

  private comparePassword(password: string, passwordConfirm: string): void {
    if (password !== passwordConfirm) {
      throw new BadRequestException('As senhas não coincidem')
    }
  }
}
