import { Module } from '@nestjs/common'
import { GroupProcessModule } from '@/application/services/process/group-process/group-process.module'
import { GroupProcessHttpController } from '@/presentation/controllers/http/process/group-process/group-process-http.controller'

@Module({
  imports: [GroupProcessModule],
  controllers: [GroupProcessHttpController],
  exports: [],
})
export class GroupProcessHttpControllerModule {}
