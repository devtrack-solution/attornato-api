import { Module } from '@nestjs/common'
import { ClientHttpController } from '@/presentation/controllers/http/client/client-http.controller'
import { ClientModule } from '@/application/services/client/client.module'

@Module({
  imports: [ClientModule],
  controllers: [ClientHttpController],
  exports: [],
})
export class ClientHttpControllerModule {}
