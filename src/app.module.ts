import { Global, Module } from '@nestjs/common'
import { PresentationModule } from '@/presentation/presentation.module'
import { ApplicationModule } from '@/application/application.module'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { ConfigModule } from '@nestjs/config'
import { OpenAiModule } from '@/openai/openai.module'

@Global()
@Module({
  imports: [
    ApplicationModule,
    InfrastructureModule.forRoot(),
    PresentationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OpenAiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
