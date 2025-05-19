import { AdministrativeModule } from '@/application/services/process/component/administrative/administrative.module'
import { Module } from '@nestjs/common'
import { AdministrativeHttpController } from './administrative-http.controller'

@Module({
  imports: [AdministrativeModule],
  controllers: [AdministrativeHttpController],
  exports: [],
})
export class AdministrativeHttpControllerModule {}
