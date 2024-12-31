import { Injectable, Logger } from '@nestjs/common'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name)
  constructor(private readonly configLoaderService: ConfigLoaderService) {}

  getHello(): string {
    this.logger.warn('WARNNING HELLO')
    this.logger.debug('DEBUG HELLO')
    this.logger.log('LOG HELLO')
    this.logger.error('ERROR HELLO')
    this.logger.fatal('FATAL HELLO')
    this.logger.verbose('VERBOSE HELLO')
    this.logger.log(this.configLoaderService.loadConfig().overload)
    return 'Hello World!'
  }
}
