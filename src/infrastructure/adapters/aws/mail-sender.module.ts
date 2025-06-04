import { Module } from '@nestjs/common'
import { MailSenderServiceImplementation, MailSenderServiceSymbol } from '@/infrastructure/adapters/aws/services/mail-sender.service'
import { ConfigModule } from '@/infrastructure/config/config.module'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: MailSenderServiceSymbol,
      useClass: MailSenderServiceImplementation,
    },
  ],
  exports: [
    {
      provide: MailSenderServiceSymbol,
      useClass: MailSenderServiceImplementation,
    },
  ],
})
export class MailSenderModule {}
