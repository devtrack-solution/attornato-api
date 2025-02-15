/*
 *  This file contains the base class for the mappers.
 *  The mappers are used to convert the domain business-objects to the database business-objects and vice versa.
 */

export interface IMapper<Y, T> {
  toPersistence(): Y

  /**
   * Converts the entity to a JSON format.
   *
   * @returns The entity in JSON format.
   */
  toJson(): T;
}