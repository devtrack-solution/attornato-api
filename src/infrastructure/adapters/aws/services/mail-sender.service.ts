import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import nodemailer, { type Transporter } from 'nodemailer'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'

export const MailSenderServiceSymbol = Symbol('MailSenderServiceSymbol')

export type Mail = {
  subject: string
  to: string | string[]
  from: string
  html: string
  text?: string
}

export interface MailSenderService {
  send: (data: Mail) => Promise<void>
}

@Injectable()
export class MailSenderServiceImplementation implements MailSenderService {
  private readonly logger = new Logger(MailSenderServiceImplementation.name)

  private readonly client: Transporter
  private config: AppConfig = new ConfigEnvironmentService()

  constructor(private readonly configService: ConfigService) {
    this.logger.log({
      host: this.config.aws.ses.host,
      port: this.config.aws.ses.port,
      secure: this.config.aws.ses.secure,
      auth: {
        user: this.config.aws.ses.user,
        pass: this.config.aws.ses.password,
      },
    })
    this.client = nodemailer.createTransport({
      host: this.config.aws.ses.host,
      port: this.config.aws.ses.port,
      secure: this.config.aws.ses.secure,
      auth: {
        user: this.config.aws.ses.user,
        pass: this.config.aws.ses.password,
      },
    })
  }

  async send(data: Mail): Promise<void> {
    try {
      await this.client.sendMail(data)
    } catch (e: any) {
      this.logger.error(e)
      throw e
    }
  }
}
