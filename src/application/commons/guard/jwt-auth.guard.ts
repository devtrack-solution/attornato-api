/**
 * Created by Wilton Oliveira Ferreira on 18/01/2023
 */

import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name)
  override handleRequest<UserAuth>(err: any, user: any, info: any) {
    this.logger.debug('User:', user)
    this.logger.debug('Error:', err)
    this.logger.debug('Info:', info)
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user as UserAuth
  }
}
