import { Module } from '@nestjs/common'
import { ProfileModule } from '@/application/services/profile/profile.module'
import { ProfileHttpController } from '@/presentation/controllers/http/profile/profile-http.controller'

@Module({
  imports: [ProfileModule],
  controllers: [ProfileHttpController],
  exports: [],
})
export class ProfileHttpControllerModule {}
