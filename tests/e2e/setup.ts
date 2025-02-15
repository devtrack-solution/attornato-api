import * as dotenv from 'dotenv'

export default async () => {
  dotenv.config({ path: 'test/e2e/.env.test' })
  console.log('Loaded environment variables:', process.env.REDIS_HOST)
}
