import { IdentifierModule } from '@/application/services/client/identifier/identifier.module';
import { Module } from '@nestjs/common'
import { IdentifierHttpController } from './identifier-http.controller';

@Module({
  imports: [IdentifierModule],
  controllers: [IdentifierHttpController],
  exports: [],
})
export class IdentifierHttpControllerModule {}
