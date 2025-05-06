import { Global, Module } from '@nestjs/common'
import { PresentationModule } from '@/presentation/presentation.module'
import { ApplicationModule } from '@/application/application.module'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { ConfigModule } from '@nestjs/config'

@Global()
@Module({
  imports: [
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
