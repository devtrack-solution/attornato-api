import { Controller, Get, HttpException } from '@nestjs/common'
import { AppService } from './app.service'
import { Throttle } from '@nestjs/throttler'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configLoaderService: ConfigLoaderService,
  ) {}

  @Get()
  getHello(): string {
    console.log('This endpoint is protected by throttling')
    return this.appService.getHello()
  }
}
