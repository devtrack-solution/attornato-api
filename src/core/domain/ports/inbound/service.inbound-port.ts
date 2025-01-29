/**
 * Interface representing a service inbound port with a single execute method.
 *
 * @template Y - The type of the input data.
 * @template T - The type of the output data.
 */
export interface IServiceInboundPort<Y, T> {
  /**
   * Executes the service with the provided data.
   *
   * @param data - The input data for the service.
   * @returns A promise that resolves to the output data.
   */
  execute(data: Y): Promise<T>;
}