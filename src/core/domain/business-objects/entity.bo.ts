/**
 * Interface representing a generic entity with methods for equality check,
 * persistence conversion, and JSON conversion.
 *
 * @template Y - The type of the input data.
 * @template T - The type of the output data.
 */
export interface IEntity<Y, T> {
  /**
   * Checks if another entity is equal to the current one.
   *
   * @param other - Another entity instance.
   * @returns True if both business-objects are equal, false otherwise.
   */
  equals(other: Y): boolean

  /**
   * Converts the entity to a persistence format.
   *
   * @returns The entity in persistence format.
   */
  toPersistence(): T

  /**
   * Converts the entity to a JSON format.
   *
   * @returns The entity in JSON format.
   */
  toJson(): T
}
