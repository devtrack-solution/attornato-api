import { IndividualModule } from '@/application/services/client/individual/individual.module';
import { Module } from '@nestjs/common'
import { IndividualHttpController } from '@/presentation/controllers/http/client/individual/individual-http.controller'

@Module({
  imports: [IndividualModule],
  controllers: [IndividualHttpController],
  exports: [],
})
export class IndividualHttpControllerModule {}
