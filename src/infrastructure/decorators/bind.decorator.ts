import * as fs from 'fs'
import * as path from 'path'

export const REGISTERED_PROVIDERS = new Map<symbol, any>()

/**
 * A decorator to bind an interface (token) to a concrete implementation.
 * Automatically registers the class as a NestJS provider.
 *
 * @param token - The interface or token to bind to.
 */
export function BindProvider(token: symbol): ClassDecorator {
  return (target: Object) => {
    registerInjectMetadata(token, target)
  }
}

function registerInjectMetadata(token: symbol, target: any) {
  if (!REGISTERED_PROVIDERS.has(token)) {
    REGISTERED_PROVIDERS.set(token, [])
  }
  REGISTERED_PROVIDERS.get(token)?.push(target)
}

/**
 * Recursively finds all TypeScript files in a given directory.
 * @param dir - The directory to search in.
 * @returns List of file paths.
 */
export function getAllFiles(dir: string, fileList: string[] = []): string[] {
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
