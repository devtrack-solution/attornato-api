import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { RootTestModule } from '@test/root-test.module'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'
import { AppConfig } from '@/domain/app-config.interface'
import { ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { HttpStatus } from '@nestjs/common'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication
  let server: any
  let config: AppConfig

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RootTestModule],
      providers: [
        {
          provide: APP_GUARD,
          useClass: ThrottlerGuard,
        },
      ],
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    await app.init()
    const configLoaderService: ConfigLoaderService = app.get(ConfigLoaderService)
    config = configLoaderService.initialize()
    server = await app.listen(config.apiPort, config.apiHost)
  })

  afterEach(async () => {
    await app.close()
  })

  it('/ (GET)', async () => {
    const response = await request(server).get('/')
    console.log('Response:', response.text)

    expect(response.status).toBe(200)
    expect(response.text).toBe('Hello World!')
  })

  it('should enforce throttling limits on GET /', async () => {
    const MAX_REQUESTS = config.throttling.limit as number
    for (let i = 0; i < MAX_REQUESTS; i++) {
      await request(app.getHttpServer()).get('/')
    }

    const res = await request(app.getHttpServer()).get('/')
    expect(res.status).toBe(HttpStatus.TOO_MANY_REQUESTS)
    expect(res.body).toMatchObject({
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      message: 'ThrottlerException: Too Many Requests',
    })
  })
})
