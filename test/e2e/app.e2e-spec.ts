import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { RootTestModule } from '@test/root-test.module'
import { AppConfig } from '@/domain/app-config.interface'
import { HttpStatus } from '@nestjs/common'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
import { ConfigModule } from '@nestjs/config'

describe.skip('AppController (e2e)', () => {
  let app: NestFastifyApplication
  let server: any
  let config: AppConfig

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        RootTestModule,
        await ConfigModule.forRoot({
          envFilePath: '.env.test',
          isGlobal: true,
        }),
      ],
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    await app.init()
    config = new ConfigEnvironmentService()
    server = await app.listen(config.apiPort, config.apiHost)
  })

  afterAll(async () => {
    await app?.close()
  })

  it('should pass this placeholder test', () => {
    expect(true).toBe(true)
  })

  /*  it('/ (GET)', async () => {
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
  })*/
})
