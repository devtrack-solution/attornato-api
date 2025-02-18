import { Criteria } from '@/core/domain/types/criteria.type'

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
  saveObject(todo: Partial<Y>): Promise<void>

  /**
   * Finds an object by criteria.
   *
   * @param props - The criteria to find the object.
   * @returns A promise that resolves to the found object or null if not found.
   */
  findOneByCriteria(props: X): Promise<Partial<T> | null>

  /**
   * Finds all objects by criteria.
   *
   * @param props - The criteria to find the objects.
   * @returns A promise that resolves to an array of found objects.
   */
  findAllByCriteria(props: Criteria.Paginated): Promise<{
    count: number
    limit: number
    offset: number
    data: Partial<T>[]
  }>

  /**
   * Finds all objects by criteria.
   *
   * @param props - The criteria to find the objects.
   * @returns A promise that resolves to an array of found objects.
   */
  findForSelectByCriteria(props: Criteria.FindBy): Promise<Partial<T>[]>

  /**
   * Updates an object in the database.
   *
   * @param todo - The object to be updated.
   * @param props - The criteria to find the objects.
   * @returns A promise that resolves when the object is updated.
   */
  updateObject(todo: Y, props: X): Promise<void>

  /**
   * Partially updates an object in the database.
   *
   * @param todo - The object to be updated.
   * @param props - The criteria to find the objects.
   * @returns A promise that resolves when the object is updated.
   */
  patchObject(todo: Partial<Y>, props: X): Promise<void>

  /**
   * Deletes an object from the database by ID.
   *
   * @param id - The ID of the object to be deleted.
   * @returns A promise that resolves when the object is deleted.
   */
  deleteObject(id: string): Promise<void>
}
