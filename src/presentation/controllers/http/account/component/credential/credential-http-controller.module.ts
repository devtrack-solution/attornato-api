import { Module } from '@nestjs/common'
import { CredentialHttpController } from '@/presentation/controllers/http/account/component/credential/credential-http.controller'
import { SecurityModule } from '@/application/services/securities/security.module'

@Module({
  imports: [SecurityModule],
  controllers: [CredentialHttpController],
  exports: [],
})
export class CredentialHttpControllerModule {}
