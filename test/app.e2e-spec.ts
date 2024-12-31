import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { RootTestModule } from '@test/root-test.module'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication
  let server: any
  let domain: string = 'localhost'
  let port: number = 3000

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RootTestModule],
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    await app.init()

    server = await app.listen(port, domain)
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
})
