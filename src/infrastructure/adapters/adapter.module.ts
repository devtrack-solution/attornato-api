import { Module } from '@nestjs/common'
import { ConfigModule } from '@/infrastructure/config/config.module'
import { AuthModule } from '@/infrastructure/adapters/http/auth.module'
import { MailSenderModule } from '@/infrastructure/adapters/aws/mail-sender.module'
import { RelationalDatabaseModule } from '@/infrastructure/adapters/relational-database/relational-database.module'

@Module({
  imports: [
    ConfigModule,
    RelationalDatabaseModule,
    AuthModule,
    MailSenderModule
  ],
  providers: [],
  exports: [
    ConfigModule,
    RelationalDatabaseModule,
    AuthModule,
    MailSenderModule
  ],
})
export class AdapterModule {}
