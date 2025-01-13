import { IUser } from "@/core/transactions/user.interface";
import { IClient } from "@/core/transactions/client.interface";
import { IRole } from "@/core/transactions/role.interface";

/**
 * `TransactionContext` interface represents the structure of a transactions context.
 * @example
 * const transactionContext: TransactionContext<any> = {
 *   user: { id: 'user1'},
 *   roles: [{ id: 'role1', name: 'role1', description: 'role1', permissions: ['permission1']}],
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
  roles: IRole[]
  client: IClient
  metadata: Record<string,string>[]
  body: T
}