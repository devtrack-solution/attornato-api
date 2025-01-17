import { Injectable, Type } from '@nestjs/common'

/**
 * A decorator to bind an interface (token) to a concrete implementation.
 * Automatically registers the class as a NestJS provider.
 *
 * @param token - The interface or token to bind to.
 * @param useClass - The implementation class.
 */
export function Bind<T>(token: Type<T>, useClass: Type<T>): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('binding:token', token, target)
    Reflect.defineMetadata('binding:useClass', useClass, target)

    // Ensure the class is registered as a NestJS provider
    Injectable()(target)
  }
}
