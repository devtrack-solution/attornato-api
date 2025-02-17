import { Module } from '@nestjs/common'
import { PermissionModule } from '@/application/services/permission/permission.module'
import { PermissionHttpController } from '@/presentation/controllers/http/permission/permission-http.controller'

@Module({
  imports: [PermissionModule],
  controllers: [PermissionHttpController],
})
export class PermissionHttpControllerModule {}
