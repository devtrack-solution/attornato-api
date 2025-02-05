export class RedisError extends Error {
  constructor(message: any) {
    super(message)
    this.name = 'RedisError'
    this.stack = message
  }
}
