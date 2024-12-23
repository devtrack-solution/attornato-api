/**
 * Created by Wilton Oliveira Ferreira on 18/01/2023
 */

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export interface UserAuth extends Express.User {
  userId: any
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  override handleRequest<UserAuth>(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user as UserAuth
  }
}
