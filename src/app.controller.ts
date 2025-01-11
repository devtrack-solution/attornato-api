import { Controller, Get, HttpException } from "@nestjs/common";
import { AppService } from './app.service'
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Throttle({default: { limit: 10, ttl: 60 }})
  @Get()
  getHello(): string {
      console.log('This endpoint is protected by throttling')
      return this.appService.getHello()
  }
}
