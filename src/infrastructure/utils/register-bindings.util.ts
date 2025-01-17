import { DynamicModule, Type } from '@nestjs/common'

/**
 * Utility to register all classes decorated with @Bind in a module.
 *
 * @param bindings - An array of classes decorated with @Bind.
 * @returns A dynamic module with providers based on the bindings.
 */
export function registerBindings(bindings: Type<any>[]): DynamicModule {
  const providers = bindings.map((binding) => {
    const token = Reflect.getMetadata('binding:token', binding)
    const useClass = Reflect.getMetadata('binding:useClass', binding)

    if (!token || !useClass) {
      throw new Error(`Class ${binding.name} is missing binding metadata. Did you forget to use @Bind()?`)
    }

    return {
      provide: token,
      useClass,
    }
  })

  return {
    module: class {}, // Anonymous module
    providers,
    exports: providers.map((provider) => provider.provide),
  }
}
