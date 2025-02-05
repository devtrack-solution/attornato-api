import { TodoType } from '@/domain/todo/types/todo.type'

export const TodoCreatedEventSymbol = Symbol('event:todo.created')

export class TodoCreatedEvent {
  constructor(public readonly data: TodoType.Input) {}
}
