export interface DistributedCacheService {
  get(key: string): Promise<string | null>
  set(key: string, value: any): Promise<void>
  delete(key: string): Promise<void>
}
