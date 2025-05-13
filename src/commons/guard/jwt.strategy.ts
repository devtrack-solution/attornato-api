/**
 * Created by Wilton Oliveira Ferreira on 18/01/2023
 */

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Constants } from '@/infrastructure/settings/constants'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, Constants.STRATEGY_JWT_AUTH) {
  constructor(private config: AppConfig = new ConfigEnvironmentService()) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secret: Buffer.from(config.jwt.publicKeyBase64, 'base64').toString('utf-8'),
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
