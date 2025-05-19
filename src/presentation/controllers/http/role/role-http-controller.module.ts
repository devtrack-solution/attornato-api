import { Module } from '@nestjs/common'
import { RoleHttpController } from '@/presentation/controllers/http/role/role-http.controller'
import { RoleModule } from '@/application/services/role/use-cases/role.module'

@Module({
  imports: [RoleModule],
  controllers: [RoleHttpController],
  exports: [],
})
export class RoleHttpControllerModule {}
