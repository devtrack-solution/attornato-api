/**
 * Created by Wilton Oliveira Ferreira on 18/01/2023
 */

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { StrategyType } from '@/infrastructure/adapters/http/auth/strategy.type'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyType.STRATEGY_JWT_AUTH) {
  constructor(private config: AppConfig = new ConfigEnvironmentService()) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.privateKeyBase64,
      algorithms: [config.jwt.algorithm],
    })
  }

  async validate(payload: any) {
    return { user_id: payload?.user_id, username: payload?.email }
  }
}
