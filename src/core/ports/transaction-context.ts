
/**
 * `IClient` interface represents the structure of a client.
 * @example
 * const client: IClient = {
 *    id: 'client1'
 * }
 *
 * @property {string} id - The client id.
 * @property {string} version - The client version.
 * @property {string} platform - The client platform.
 * @property {string} platformVersion - The client platform version.
 */
export interface IClient {
  id: string
  version: string
  platform: string
  platformVersion: string
}

/**
 * `IUser` interface represents the structure of a user.
 * @example
 * const user: IUser = {
 *    id: 'user1'
 * }
 *
 * @property {string} id - The user id.
 */
export interface IUser {
  id: string
}

/**
 * `TransactionContext` interface represents the structure of a transaction context.
 * @example
 * const transactionContext: TransactionContext<any> = {
 *   user: { id: 'user1'},
 *   client: { id: 'client1'},
 *   metadata: { 'key1': 'value1'},
 *   body: { id: 'todo1', name: 'todo1', age: 1, birthday: new Date(), isActive: true, height: 1.1 }
 * }
 *
 * @property {IUser} user - The user.
 * @property {IClient} client - The client.
 * @property {Record<string,string>[]} metadata - The metadata.
 * @property {T} body - The body.
 */
export interface ITransactionContext<T> {
  user: IUser
  client: IClient
  metadata: Record<string,string>[]
  body: T
}