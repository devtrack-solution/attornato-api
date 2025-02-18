/**
 * Interface representing a service inbound port with a single execute method.
 *
 * @template Y - The type of the input data.
 * @template T - The type of the output data.
 */
export interface IServiceInboundPort<Y, X, T> {
  /**
   * Executes the service with the provided data.
   *
   * @param data - The input data for the service.
   * @param criteria
   * @returns A promise that resolves to the output data.
   */
  execute(data: Y, criteria: X): Promise<T>
}
/**
 * Interface representing a service inbound port with a single execute method.
 *
 * @template Y - The type of the input data.
 * @template T - The type of the output data.
 */
export interface IServiceWithDataInboundPort<Y, X, T> {
  /**
   * Executes the service with the provided data.
   *
   * @param data - The input data for the service.
   * @returns A promise that resolves to the output data.
   */
  execute(data: Y): Promise<T>
}

/**
 * Interface representing a service inbound port with a single execute method.
 *
 * @template X - The type of the criteria data.
 * @template T - The type of the output data.
 */
export interface IServiceWithCriteriaInboundPort<X, T> {
  /**
   * Executes the service with the provided data.
   *
   * @param criteria
   * @returns A promise that resolves to the output data.
   */
  execute(criteria: X): Promise<T>
}
