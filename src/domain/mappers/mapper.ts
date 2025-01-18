export interface IMapper<Y,T> {
  toPersistence(): Y
}

// Example of a base class implementing the Mapper interface
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