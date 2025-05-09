import { Module } from '@nestjs/common'
import { PresentationModule } from '@/presentation/presentation.module'
import { ApplicationModule } from '@/application/application.module'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { ConfigModule } from '@nestjs/config'
import { CoreModule } from '@/core/core.module'

@Module({
  imports: [
    CoreModule,
    ApplicationModule,
    InfrastructureModule.forRoot(),
    PresentationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
