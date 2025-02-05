/*
 * `Role` interface represents the structure of a role.
 * @example
 * const role: IRole = {
 *   id: 'role1',
 *   name: 'role1',
 *   description: 'role1',
 *   permissions: ['permission1']
 * }
 *
 * @property {string} id - The role id.
 * @property {string} name - The role name.
 * @property {string} description - The role description.
 * @property {string[]} permissions - The role permissions.
 *
 */
export interface IRole {
  id: string
  name: string
  description: string
  permissions: string[]
}
