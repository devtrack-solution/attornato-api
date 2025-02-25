import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'

const config = new ConfigEnvironmentService()
if (!['postgres', 'mysql', 'mariadb'].includes(config.database.type)) {
  throw new Error(`Unsupported DB_TYPE: ${config.database.type}`)
}

const validLogLevels = ['query', 'error', 'schema', 'warn', 'info', 'log', 'migration'] as const

type LogLevel = (typeof validLogLevels)[number]

function parseLogLevels(levels: string | string[] | undefined): LogLevel[] | boolean {
  if (!levels) return false

  const levelsArray = Array.isArray(levels) ? levels : levels.split(',')
  const parsedLevels = levelsArray.map((level) => level.trim() as LogLevel).filter((level) => validLogLevels.includes(level))

  return parsedLevels.length > 0 ? parsedLevels : false
}

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: config.database.type as 'postgres' | 'mysql' | 'mariadb',
  host: config.database.host,
  port: config.database.port as number,
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
  entities: [__dirname + '/../adapters/pgsql/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../adapters/pgsql/migrations/*{.ts,.js}'],
  synchronize: config.database.sync,
  dropSchema: false,
  logging: parseLogLevels(config.database.logLevel),
  logger: config.database.format as 'advanced-console' | 'simple-console' | 'file' | 'debug',
  timezone: config.database.timezone,
  debug: config.database.debug,
  ssl: { rejectUnauthorized: config.database.ssl },
}
