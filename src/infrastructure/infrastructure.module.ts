import { DynamicModule, Global, Logger, MiddlewareConsumer, Module, NestModule, Provider, RequestMethod } from '@nestjs/common'
import path from 'path'
import { getAllFiles, REGISTERED_PROVIDERS } from '@/infrastructure/decorators/bind.decorator'
import { IdempotencyMiddleware } from '@/presentation/middlewares/idempotency.middleware'
import { AdapterModule } from '@/infrastructure/adapters/adapter.module'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'

@Global()
@Module({})
export class InfrastructureModule implements NestModule {
  private static readonly logger = new Logger(InfrastructureModule.name)
  private static instance: DynamicModule | null = null
  private static processingPromise: Promise<DynamicModule> | null = null
  private static config: AppConfig = new ConfigEnvironmentService()

  static async forRoot(): Promise<DynamicModule> {
    if (this.instance) {
      this.logger.log('Returning existing instance of InfrastructureModule.')
      return this.instance
    }
    if (this.processingPromise) {
      this.logger.log('Awaiting the completion of an ongoing initialization...')
      return this.processingPromise
    }
    this.logger.log('Initializing InfrastructureModule forRoot()...')
    this.processingPromise = (async () => {
      try {
        const files = getAllFiles(path.join(__dirname, '..'))
        await Promise.all(files.map((file) => import(file)))

        function customSerialize(obj: any): string {
          return JSON.stringify(
            obj,
            (key, value) => {
              if (typeof value === 'symbol') {
                return value.toString()
              }
              if (value instanceof Map) {
                return Array.from(value.entries())
              }
              return value
            },
            2,
          )
        }

        this.logger.log('Serviços registrados com @RegisterInject:', customSerialize(REGISTERED_PROVIDERS))

        const providersMap = new Map<symbol, any>()

        for (const [token, targets] of REGISTERED_PROVIDERS.entries()) {
          if (!providersMap.has(token)) {
            if (targets.length > 1) {
              throw Error(`${String(token)} has more than 1 @BindInject: ${JSON.stringify(targets)}`)
            } else {
              providersMap.set(token, targets[targets.length - 1])
            }
          }
        }

        const providers: Provider[] = Array.from(providersMap.entries()).map(([token, target]) => ({
          provide: token,
          useClass: target,
          JwtService,
        }))

        this.logger.log(
          'Providers gerados a partir dos serviços registrados:',
          providers.map((provider: any) => ({
            provide: provider.provide.toString(),
            useClass: provider.useClass.name || provider.useClass,
          })),
        )

        let toExport: any = providers.map((provider: any) => provider.provide)

        toExport = Array.from(new Set(toExport))
        toExport.forEach(
          (provider: any) => this.logger.log('toExport (unique): ', provider.toString()),
          (provider: any) => this.logger.log('toExport (unique): ', provider.toString()),
        )

        this.instance = {
          global: true,
          imports: [
            AdapterModule,
            JwtModule.register({
              publicKey: this.config.jwt.publicKeyBase64,
              privateKey: this.config.jwt.privateKeyBase64,
              signOptions: { algorithm: 'RS512' },
            }),
          ],
          module: InfrastructureModule,
          providers,
          exports: [AdapterModule, JwtModule, ...toExport],
        }

        this.logger.log('InfrastructureModule initialized successfully.')

        return this.instance
      } catch (error) {
        throw error
      } finally {
        this.processingPromise = null
      }
    })()

    return this.processingPromise
  }

  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(IdempotencyMiddleware)
      .exclude({
        path: '/docs(.*)',
        method: RequestMethod.ALL,
      })
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
