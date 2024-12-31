import { Module } from '@nestjs/common'
import { AppService } from '@/app.service'
import { AppController } from '@/app.controller'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module' // Certifique-se do caminho correto

@Module({
  imports: [InfrastructureModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class RootTestModule {}
