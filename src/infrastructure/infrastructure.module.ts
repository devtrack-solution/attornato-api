import { DynamicModule, Global, MiddlewareConsumer, Module, NestModule, Provider, RequestMethod, Type } from '@nestjs/common'
import path from 'path'
import { getAllFiles, REGISTERED_PROVIDERS } from '@/infrastructure/decorators/bind.decorator'
import { IdempotencyMiddleware } from '@/presentation/middlewares/idempotency.middleware'
import { AdapterModule } from '@/infrastructure/adapters/adapter.module'

@Global()
@Module({})
export class InfrastructureModule implements NestModule {
  private static instance: DynamicModule | null = null
  private static processingPromise: Promise<DynamicModule> | null = null

  static async forRoot(): Promise<DynamicModule> {
    if (this.instance) {
      console.log('Returning existing instance of InfrastructureModule.')
      return this.instance
    }
    if (this.processingPromise) {
      console.log('Awaiting the completion of an ongoing initialization...')
      return this.processingPromise
    }
    console.log('Initializing InfrastructureModule forRoot()...')
    this.processingPromise = (async () => {
      try {
        const files = getAllFiles(path.join(__dirname, '..'))
        await Promise.all(files.map((file) => import(file)))
        console.log('Serviços registrados com @RegisterInject:', REGISTERED_PROVIDERS)

        const providersMap = new Map<symbol, any>()
        for (const [token, targets] of REGISTERED_PROVIDERS.entries()) {
          if (!providersMap.has(token)) {
            if (targets.length > 1) {
              throw Error(`${String(token)} has more than 1 @BindInject: ${targets}`)
            } else {
              providersMap.set(token, targets[targets.length - 1])
            }
          }
        }
        const providers: Provider[] = Array.from(providersMap.entries()).map(([token, target]) => ({
          provide: token,
          useClass: target,
        }))
        console.log('Providers gerados a partir dos serviços registrados:', Array.from(providers.values()))
        let toExport: any = providers.map((provider: any) => provider.provide)

        toExport = Array.from(new Set(toExport))
        toExport.forEach((provider: any) => console.log('toExport (unique): ', provider))

        this.instance = {
          global: true,
          imports: [AdapterModule],
          module: InfrastructureModule,
          providers,
          exports: [AdapterModule, ...toExport],
        }

        console.log('InfrastructureModule initialized successfully.')

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
    consumer.apply(IdempotencyMiddleware).exclude({ path: '/docs(.*)', method: RequestMethod.ALL }).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
