/**
 * Interface representing a relational database outbound port with methods for saving, finding, updating, and deleting objects.
 * @template X - The type of the criteria to find the object.
 * @template Y - The type of the input data.
 * @template T - The type of the output data.
 */
export interface IRelationalDatabaseOutboundPort<X, Y, T> {
  /**
   * Saves an object to the database.
   *
   * @param todo - The object to be saved.
   * @returns A promise that resolves when the object is saved.
   */
  saveObject(todo: Partial<Y>): Promise<void>;

  /**
   * Finds an object by criteria.
   *
   * @param props - The criteria to find the object.
   * @returns A promise that resolves to the found object or null if not found.
   */
  findByCriteria(props: X): Promise<Partial<T> | null>;

  /**
   * Finds all objects by criteria.
   *
   * @param props - The criteria to find the objects.
   * @returns A promise that resolves to an array of found objects.
   */
  findAllByCriteria(props: X): Promise<Partial<T>[]>;

  /**
   * Updates an object in the database.
   *
   * @param todo - The object to be updated.
   * @returns A promise that resolves when the object is updated.
   */
  updateObject(todo: Partial<Y>): Promise<void>;

  /**
   * Deletes an object from the database by ID.
   *
   * @param id - The ID of the object to be deleted.
   * @returns A promise that resolves when the object is deleted.
   */
  deleteObject(id: string): Promise<void>;
}