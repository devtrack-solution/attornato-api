export function generateIdempotencyKey(idempotencyKey: string, user: string, path: string, method: string): string {
  const firstPathSegment = path.split('/').filter((segment) => segment)[0]
  if (!firstPathSegment) {
    return `${user}-root-${method}-${path}-${idempotencyKey}`
  }
  return `${user}-${firstPathSegment}-${method}-${path}-${idempotencyKey}`
}
