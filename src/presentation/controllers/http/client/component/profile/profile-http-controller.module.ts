import { Module } from '@nestjs/common'
import { ProfileModule } from '@/application/services/client/component/profile/profile.module'
import { ProfileHttpController } from '@/presentation/controllers/http/client/component/profile/profile-http.controller'

@Module({
  imports: [ProfileModule],
  controllers: [ProfileHttpController],
  exports: [],
})
export class ProfileHttpControllerModule {}
