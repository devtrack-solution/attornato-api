
/**
 * `IClient` interface represents the structure of a client.
 * @example
 * const client: IClient = {
 *    id: 'client1'
 *    version: '1.0.0'
 *    platform: 'web'
 *    platformVersion: '1.0.0'
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