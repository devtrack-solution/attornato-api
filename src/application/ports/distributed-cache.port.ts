export const DistributedCachePortSymbol = Symbol('DistributedCachePortSymbol')

/**
 * Interface representing a distributed cache outbound port with methods for getting, setting, and deleting cache entries.
 */
export interface IDistributedCachePort {
  /**
   * Retrieves a value from the cache by key.
   *
   * @param key - The key of the cache entry to retrieve.
   * @returns A promise that resolves to the value of the cache entry, or null if not found.
   */
  get(key: string): Promise<string | null>

  /**
   * Sets a value in the cache with the specified key.
   *
   * @param key - The key of the cache entry to set.
   * @param value - The value to set in the cache.
   * @returns A promise that resolves when the value is set.
   */
  set(key: string, value: any): Promise<void>

  /**
   * Deletes a cache entry by key.
   *
   * @param key - The key of the cache entry to delete.
   * @returns A promise that resolves when the cache entry is deleted.
   */
  delete(key: string): Promise<void>
}
