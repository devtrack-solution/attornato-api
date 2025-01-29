import { IInboundPort } from "@/core/domain/ports/inbound/inbound.port";

export const CreateTodoInputPortToken = Symbol.for('CreateTodoInputPortToken')

export interface CreateTodoInboundPort<Y,T> extends IInboundPort<Y,T> {}
