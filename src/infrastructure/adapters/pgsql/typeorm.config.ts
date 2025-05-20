import 'dotenv/config'
import { DataSource } from 'typeorm'
import process from 'node:process'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST === 'db' ? 'localhost' : process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/**/*.{ts,js}'],
  synchronize: false,
  ssl: { rejectUnauthorized: process.env.DB_SSL === 'false' }
})
