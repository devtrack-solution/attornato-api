import { Criteria } from '@/core/domain/types/criteria.type'
import { DeepPartial } from 'typeorm'
import { EntityManager } from 'typeorm/entity-manager/EntityManager'
import { DataBase } from '@/core/domain/types/database.type'

/**
 * Interface representing a relational database delete-department.inbound-port.ts port with methods for saving, finding, updating, and deleting objects.
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
  saveObject(todo: DeepPartial<Y>): Promise<void>

  /**
   * Saves an object to the database with relations.
   *
   * @param input - The object to be saved.
   * @param manyToManyFields
   * @returns A promise that resolves when the object is saved.
   */
  saveObjectWithRelations(input: DeepPartial<T>, manyToManyFields?: DataBase.ManyToManyObject[]): Promise<void>

  /**
   * Finds an object by criteria.
   *
   * @param props - The criteria to find the object.
   * @param relations - Objects relative to return.
   * @returns A promise that resolves to the found object or null if not found.
   */
  findOneByCriteria(props: X, relations?: string[]): Promise<Partial<T> | null>

  /**
   * Finds all objects by criteria.
   *
   * @param props - The criteria to find the objects.
   * @param order - Define properties and order for find.
   * @param select - Define the properties of root object to return.
   * @param searchFields - Define fields to search text.
   * @param filters - List of elements with parameter and value to be checked
   * @param relations - Objects relative to return.
   * @param whereByValue - filter find for this value
   * @returns A promise that resolves to an array of found objects.
   */
  findAllByCriteria(
    props: Criteria.Paginated,
    order?: Record<string, string>,
    select?: string[],
    searchFields?: string[],
    relations?: string[],
    filters?: Record<string, any>,
    whereByValue?: Record<string, any>
  ): Promise<{
    count: number
    limit: number
    offset: number
    data: Partial<T>[]
  }>

  /**
   * Finds all objects by criteria.
   *
   * @param props - The criteria to find the objects.
   * @param order - Define properties and order for find.
   * @param select - Define the properties of root object to return.
   * @param searchFields - Define fields to search text.
   * @param relations - Objects relative to return.
   * @param whereByValue - filter find for this value
   * @returns A promise that resolves to an array of found objects.
   */
  findForSelectByCriteria(props: Criteria.FindBy, order?: Record<string, string>, select?: string[], searchFields?: string[], relations?: string[], whereByValue?: Record<string, any>): Promise<Partial<T>[]>

  /**
   * Updates an object in the database.
   *
   * @param todo - The object to be updated.
   * @param props - The criteria to find the objects.
   * @param relations - Objects relative to return.
   * @returns A promise that resolves when the object is updated.
   */
  updateObject(todo: Y, props: X, relations?: string[]): Promise<void>

  /**
   * Partially updates an object in the database.
   *
   * @param todo - The object to be updated.
   * @param props - The criteria to find the objects.
   * @param EntityClass - To create a new instance of the object and validate updates.
   * @param relations - Objects relative to return.
   * @param manyToManyFields
   * @returns A promise that resolves when the object is updated.
   */
  patchObject(todo: Partial<Y>, props: X, EntityClass: new (...args: any[]) => Y, relations?: string[], manyToManyFields?: DataBase.ManyToManyObject[]): Promise<void>

  /**
   * Deletes an object from the database by ID.
   *
   * @param id - The ID of the object to be deleted.
   * @returns A promise that resolves when the object is deleted.
   */
  deleteObject(id: string): Promise<void>

  /**
   * Remove object and its relationships from the database.
   */
  removeObjectDatabase(id: string, relations?: string[]): Promise<void>

  /**
   * Executes a transactional operation and handles commit/rollback automatically.
   *
   * @param operation - A function that contains all database operations to be performed.
   * The `EntityManager` will be passed as an argument for managing transactional operations.
   *
   * @returns A Promise resolving to the result of the transactional operation.
   */
  transaction<T>(operation: (manager: EntityManager) => Promise<T>): Promise<T>
}
