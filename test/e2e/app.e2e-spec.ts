import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { RootTestModule } from '@test/root-test.module'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'
import { AppConfig } from '@/application/domain/app-config.interface'
import { ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { HttpStatus } from '@nestjs/common'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication
  let server: any
  let config: AppConfig

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RootTestModule],
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    await app.init()
    const configLoaderService: ConfigLoaderService = app.get(ConfigLoaderService)
    config = configLoaderService.initialize()
    server = await app.listen(config.apiPort, config.apiHost)
  })

  afterAll(async () => {
    await app.close()
  })

  it('/ (GET)', async () => {
    const response = await request(server).get('/')
    console.log('Response:', response.text)

    expect(response.status).toBe(200)
    expect(response.text).toBe('Hello World!')
  })

  it('should enforce throttling limits on GET /', async () => {
    const MAX_REQUESTS = (config.throttling.limit as number) || 10
    const TTL = (config.throttling.ttl as number) || 60

    console.log('Throttling Config:', config.throttling)

    for (let i = 0; i < MAX_REQUESTS; i++) {
      const res = await request(server).get('/')
      expect(res.status).toBe(HttpStatus.OK)
    }

    const res = await request(server).get('/')

    expect(res.status).toBe(HttpStatus.TOO_MANY_REQUESTS)
    expect(res.body).toMatchObject({
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      message: 'ThrottlerException: Too Many Requests',
    })

    await new Promise((resolve) => setTimeout(resolve, TTL * 1000))
    const retryRes = await request(server).get('/')
    expect(retryRes.status).toBe(HttpStatus.OK)
  })
})
