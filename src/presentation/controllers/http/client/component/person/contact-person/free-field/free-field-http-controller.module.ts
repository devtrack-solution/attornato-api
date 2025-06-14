import { Module } from '@nestjs/common'
import { FreeFieldHttpController } from '@/presentation/controllers/http/client/component/person/contact-person/free-field/free-field-http.controller'
import { FreeFieldModule } from '@/application/services/client/component/person/contact-person/free-field/free-field.module'

@Module({
  imports: [FreeFieldModule],
  controllers: [FreeFieldHttpController],
  exports: [],
})
export class FreeFieldHttpControllerModule {}
