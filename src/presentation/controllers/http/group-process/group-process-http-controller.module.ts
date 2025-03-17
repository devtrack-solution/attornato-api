import { Module } from '@nestjs/common'
import { GroupProcessModule } from '@/application/services/group-process/group-process.module'
import { GroupProcessHttpController } from '@/presentation/controllers/http/group-process/group-process-http.controller'

@Module({
  imports: [GroupProcessModule],
  controllers: [GroupProcessHttpController],
  exports: [],
})
export class GroupProcessHttpControllerModule {}
