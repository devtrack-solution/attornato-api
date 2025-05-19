import { Module, forwardRef } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [forwardRef(() => InfrastructureModule), TypeOrmModule.forFeature()],
  providers: [],
  exports: [],
})
export class CoreInfrastructureModule {}
