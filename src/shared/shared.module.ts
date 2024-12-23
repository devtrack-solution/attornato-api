import { configModuleOptions } from '@/shared/settings/module-options'
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { CustomInjectorModule } from 'nestjs-custom-injector'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), CustomInjectorModule.forRoot(), ScheduleModule.forRoot()],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class SharedModule {}
