import 'reflect-metadata'
import { DynamicModule, Type } from '@nestjs/common'

import * as fs from 'fs'
import * as path from 'path'

const BIND_METADATA_KEY = Symbol('binding:registeredClasses')
/**
 * A decorator to bind an interface (token) to a concrete implementation.
 * Automatically registers the class as a NestJS provider.
 *
 * @param token - The interface or token to bind to.
 * @param useClass - The implementation class.
 */
export function Bind(token: symbol, useClass: any): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata('binding:token', token, target)
    Reflect.defineMetadata('binding:useClass', useClass, target)

    // Register the class globally for dynamic discovery
    const existingBindings = Reflect.getMetadata(BIND_METADATA_KEY, Reflect) || []
    Reflect.defineMetadata(BIND_METADATA_KEY, [...existingBindings, target], Reflect)
  }
}

/**
 * Recursively finds all TypeScript files in a given directory.
 * @param dir - The directory to search in.
 * @returns List of file paths.
 */
function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList)
    } else if (file.endsWith('.ts') || file.endsWith('.js')) {
      fileList.push(filePath)
    }
  }
  return fileList
}

/**
 * Dynamically register all classes decorated with @Bind in the infrastructure folder.
 */
export async function registerBindingsDynamically(): Promise<DynamicModule> {
  const infrastructureDir = path.join(__dirname, '..') // Adjust to point to 'src/infrastructure'
  const files = getAllFiles(infrastructureDir)

  for (const file of files) {
    await import(file)
  }

  const bindings: Type<any>[] = Reflect.getMetadata(BIND_METADATA_KEY, Reflect) || []

  if (bindings.length === 0) {
    console.warn('No bindings found. Ensure classes are decorated with @Bind().')
  }

  const providers = bindings.map((binding) => {
    const token = Reflect.getMetadata('binding:token', binding)
    const useClass = Reflect.getMetadata('binding:useClass', binding)

    if (!token || !useClass) {
      throw new Error(`Class ${binding?.name || 'Unknown'} is missing binding metadata. Did you forget to use @Bind()?`)
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
