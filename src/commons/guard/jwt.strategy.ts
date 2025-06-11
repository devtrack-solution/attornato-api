/**
 * Created by Wilton Oliveira Ferreira on 18/01/2023
 */

import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Constants } from '@/infrastructure/settings/constants'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, Constants.STRATEGY_JWT_AUTH) {
  constructor(
    @Inject(AppConfigToken)
    private readonly config: AppConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secret: Buffer.from(config.security.publicKey, 'base64').toString('utf-8'),
      algorithms: ['RS512'],
    })
  }

  async validate(payload: any) {
    return {
      user_id: payload?.user_id,
      username: payload?.email,
      profile: payload?.profile,
    }
  }
}
