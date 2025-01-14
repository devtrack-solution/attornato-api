export function generateIdempotencyKey(idempotencyKey: string, user: string, path: string): string {
  const firstPathSegment = path.split('/').filter((segment) => segment)[0]
  if (!firstPathSegment) {
    return `${user}-root-${idempotencyKey}`
  }
  return `${user}-${firstPathSegment}-${idempotencyKey}`
}
