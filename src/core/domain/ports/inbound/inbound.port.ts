export interface IInboundPort<Y,T> {
  execute: (data: Y) => Promise<T>
}