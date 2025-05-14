import { Module } from '@nestjs/common'
import { SharedModule } from '@/commons/shared.module'
import { MailSenderServiceImplementation, MailSenderServiceSymbol } from '@/infrastructure/adapters/aws/services/mail-sender.service'

@Module({
  imports: [SharedModule],
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
