export function deepOmit(obj: any, keysToOmit: string[]): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepOmit(item, keysToOmit))
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      if (!keysToOmit.includes(key)) {
        acc[key] = deepOmit(obj[key], keysToOmit)
      }
      return acc
    }, {} as any)
  }
  return obj
}
