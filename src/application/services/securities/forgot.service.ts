import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { AuthType } from '@/domain/securities/types/auth.type'
import { CredentialRepositoryOutboundPort, CredentialRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/credential-repository.outbound-port'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
import { ForgotAuthInboundPort } from '@/domain/securities/ports/inbound/component/auth/forgot-auth.inbound-port'

import passgem from 'generate-password'
import { v4 as uuidv4 } from 'uuid'
import { MailSenderService, MailSenderServiceSymbol } from '@/infrastructure/adapters/aws/services/mail-sender.service'
import { RECOVERY_CODE_EMAIL } from '@/infrastructure/adapters/aws/services/email.properties'
import { DateTime } from 'luxon'
import { Credential } from '@/domain/securities/business-objects/credential.bo'
import { HashUtil } from '@/core/utils/hash.util'

@Injectable()
export class ForgotService implements ForgotAuthInboundPort {
  private config: AppConfig = new ConfigEnvironmentService()
  private readonly logger = new Logger(ForgotService.name)

  constructor(
    @Inject(CredentialRepositoryOutboundPortSymbol)
    private readonly credentialRepository: CredentialRepositoryOutboundPort,
    @Inject(MailSenderServiceSymbol)
    protected readonly mailSenderService: MailSenderService,
  ) {}

  async execute(data: AuthType.ForgotPasswordOutput): Promise<void> {
    try {
      const credential = await this.credentialRepository.findByUsername(data)
      if (!credential) {
        throw new UnauthorizedException('Not found username: ' + data.username)
      }

      const recoveryCode = passgem.generate({ length: 6, numbers: true }).toUpperCase()
      const hashedCode =  HashUtil.generateHash(recoveryCode)
      const recoveryToken = uuidv4()
      const thirtyMinutesLater = DateTime.now().setZone('America/Sao_Paulo').plus({ minutes: 30 }).toJSDate()

      await this.credentialRepository.patchObject(
        {
          resetPasswordCode: hashedCode,
          resetPasswordToken: recoveryToken,
          expiredCodeAt: thirtyMinutesLater,
          requestNewPassword: true,
        },
        { id: credential.id! },
        Credential,
      )

      // Aqui você pode enviar o e-mail com o código
      this.logger.log(`Código de recuperação: ${recoveryCode}`)

      await this.mailSenderService.send({
        subject: 'Código de recuperação da senha!',
        to: [credential.username!],
        from: this.config.aws.ses.from,
        html: RECOVERY_CODE_EMAIL(credential.username!, recoveryCode),
      })
    } catch (e) {
      this.logger.error(e)
      if (e instanceof UnauthorizedException) {
        throw e
      }
    }
  }
}
