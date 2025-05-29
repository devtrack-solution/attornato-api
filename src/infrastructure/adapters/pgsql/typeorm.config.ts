import 'dotenv/config'
import { DataSource } from 'typeorm'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
const config = new ConfigEnvironmentService()

export const AppDataSource = new DataSource({
  type: config.database.type as 'postgres' | 'mysql' | 'mariadb',
  host: config.database.host,
  port: Number(config.database.port),
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/**/*.{ts,js}'],
  synchronize: false,
  ssl: { rejectUnauthorized: false }
})
