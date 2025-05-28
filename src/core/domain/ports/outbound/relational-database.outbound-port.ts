import { Criteria } from '@/core/domain/types/criteria.type'
import { DeepPartial } from 'typeorm'
import { EntityManager } from 'typeorm/entity-manager/EntityManager'

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
   * @returns A promise that resolves when the object is saved.
   */
  saveObjectWithRelations(input: DeepPartial<T>): Promise<void>

  /**
   * Finds an object by criteria.
   *
   * @param props - The criteria to find the object.
   * @param relations - Objects relative to return.
   * @returns A promise that resolves to the found object or null if not found.
   */
  findOneByCriteria(props: X, relations?: string[]): Promise<Partial<T> | null>

  /**
   * Finds all entities matching pagination and filter criteria.
   *
   * @param props - Objeto de paginação e parâmetros base da requisição.
   * Deve conter as propriedades `limit`, `offset`, `search`, `isActive` entre outras.
   *
   * Exemplo:
   * ```ts
   * {
   *   limit: 10,
   *   offset: 0,
   *   search: 'joão',
   *   isActive: true
   * }
   * ```
   *
   * @param mainEntity
   * @param order - Objeto que define os campos de ordenação e suas direções (ASC ou DESC).
   * As chaves são os campos da entidade, e os valores são as direções de ordenação.
   *
   * Exemplo:
   * ```ts
   * { createdAt: 'ASC', name: 'DESC' }
   * ```
   *
   * @param select - Lista de campos da entidade principal (`T`) que devem ser retornados.
   * Se omitido, todos os campos serão retornados.
   *
   * Exemplo:
   * ```ts
   * ['id', 'name', 'createdAt']
   * ```
   *
   * @param searchFields - Lista de campos nos quais será aplicada a busca textual (`search`).
   * Os campos podem ser diretos ou relacionais, como `accountPerson.name`.
   *
   * Exemplo:
   * ```ts
   * ['name', 'accountPerson.email']
   * ```
   *
   * @param relations - Relações a serem carregadas com `leftJoinAndSelect`. Deve conter o nome das propriedades da entidade.
   *
   * Exemplo:
   * ```ts
   * ['accountPerson', 'preferences']
   * ```
   *
   * @param filters - Filtros dinâmicos com suporte a operadores como `_from`, `_to`, `_like`.
   * Usado para criar condições como intervalo de datas, busca parcial ou igualdade.
   *
   * Exemplo:
   * ```ts
   * {
   *   'createdAt_from': '2025-01-01',
   *   'createdAt_to': '2025-12-31',
   *   'accountPerson.name_like': 'laercio'
   * }
   * ```
   * Operadores suportados:
   * - `_from`: campo >= valor
   * - `_to`: campo <= valor
   * - `_like`: campo ILIKE '%valor%'
   * - sem sufixo: campo = valor
   *
   * @param whereByValue - Filtros diretos aplicados via igualdade exata.
   * Geralmente usado para filtros fixos como `status`, `type`, etc.
   * Ao contrário de `filters`, não suporta operadores.
   *
   * Exemplo:
   * ```ts
   * {
   *   'entity.status': 'PENDING',
   *   'accountPerson.gender': 'MALE'
   * }
   * ```
   *
   * @returns Um objeto contendo a lista paginada de dados encontrados, junto com a contagem total.
   *
   * Exemplo de retorno:
   * ```ts
   * {
   *   count: 25,
   *   limit: 10,
   *   offset: 0,
   *   data: [ { id: '...', name: '...', ... }, ... ]
   * }
   * ```
   */
  findAllByCriteria(
    props: Criteria.Paginated,
    order?: Record<string, string>,
    select?: string[],
    searchFields?: string[],
    relations?: string[],
    filters?: Record<string, any>,
    whereByValue?: Record<string, any>,
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
   * @param whereByValue - filter for this value
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
   * @returns A promise that resolves when the object is updated.
   */
  patchObject(todo: Partial<Y>, props: X, EntityClass: new (...args: any[]) => Y, relations?: string[]): Promise<void>

  /**
   * Deletes an object from the database by ID.
   *
   * @param id - The ID of the object to be deleted.
   * @returns A promise that resolves when the object is deleted.
   */
  deleteObject(id: string): Promise<void>

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
