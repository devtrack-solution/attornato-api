/*
*  This file contains the base class for the mappers.
*  The mappers are used to convert the domain entities to the database entities and vice versa.
*/

export interface IMapper<Y,T> {
  toPersistence(): Y
}

/**
 * Base class for the mappers.
 */
export abstract class Mapper<Y, T> implements IMapper<Y, T> {
  /**
   * Implement the toPersistent method for the specific entity.
   */
  abstract toPersistence(): Y;

  /**
   * Implement the fromRepositoryToDomain method for the specific entity.
   */
  static fromRepositoryToDomain(_repositoryData: any): any {
    throw new Error(
      'fromRepositoryToDomain must be implemented in the derived class.'
    );
  }
}