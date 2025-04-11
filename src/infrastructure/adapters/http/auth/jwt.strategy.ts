/**
 * Created by Wilton Oliveira Ferreira on 18/01/2023
 */

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { StrategyType } from '@/infrastructure/adapters/http/auth/strategy.type'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyType.STRATEGY_JWT_AUTH) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.publicKey'),
      algorithms: ['RS512'],
    })
  }

  async validate(payload: any) {
    return { user_id: payload?.user_id, username: payload?.email }
  }
}
