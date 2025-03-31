import { Module } from '@nestjs/common'
import { ContactTypeModule } from '@/application/services/contact-type/contact-type.module'
import { ContactTypeHttpController } from '@/presentation/controllers/http/contact-type/contact-type-http.controller'

@Module({
  imports: [ContactTypeModule],
  controllers: [ContactTypeHttpController],
  exports: [],
})
export class ContactTypeHttpControllerModule {}
