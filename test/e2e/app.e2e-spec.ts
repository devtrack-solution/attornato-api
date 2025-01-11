import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { RootTestModule } from '@test/root-test.module'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'
import { AppConfig } from '@/domain/app-config.interface'
import { ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication
  let server: any
  let config: AppConfig
  let domain: string = 'localhost'
  let port: number = 3000

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
    server = await app.listen(port, domain)
    const configLoaderService: ConfigLoaderService = app.get(ConfigLoaderService)
    config = configLoaderService.initialize()
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
    const TIME_WINDOW = config.throttling.ttl as number

    // const responses = []

    for (let i = 0; i < 10; i++) {
      await request(app.getHttpServer()).get('/')
    }

    // 11th request should fail
    const res = await request(app.getHttpServer()).get('/')
    expect(res.status).toBe(429) // HTTP status code for "Too Many Requests"
    expect(res.body).toMatchObject({
      statusCode: 429,
      message: 'ThrottlerException: Too Many Requests',
    })

    // Fazer múltiplas requisições ao endpoint
    /*for (let i = 0; i <= MAX_REQUESTS + 5; i++) {
      const response = await request(server).get('/');
      responses.push(response);
    }*/

    // Validar que as primeiras requisições estão dentro do limite
    /*for (let i = 0; i < MAX_REQUESTS; i++) {
      expect(responses[i].status).toBe(200);
    }*/

    // expect(responses[MAX_REQUESTS + 1].status).toBe(429)
    // expect(responses[MAX_REQUESTS + 1].body.message).toContain('Too Many Requests')

    // console.log(`Throttling behavior validated: ${responses.length} requests made.`)
  })
})
