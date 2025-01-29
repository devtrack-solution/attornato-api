import { IInboundPort } from "@/core/domain/ports/inbound/inbound.port";

export const UpdateTodoInputPortToken = Symbol.for('UpdateTodoInputPortToken')

export interface UpdateTodoInboundPort<Y,T> extends IInboundPort<Y,T> {}
