import bcrypt from 'bcryptjs'

import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
const config = new ConfigEnvironmentService()

export class HashUtil {
  static generateHash(plain: string): string {
    const salt = bcrypt.genSaltSync(config.password.saltRounds)
    return bcrypt.hashSync(plain, salt)
  }

  static compareHash(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed)
  }
}
