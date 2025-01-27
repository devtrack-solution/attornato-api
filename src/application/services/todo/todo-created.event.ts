import { TodoTypes } from '@/domain/todo/types/todo.types'

export const TodoCreatedEventSymbol = Symbol('event:todo.created')

export class TodoCreatedEvent {
  constructor(public readonly data: TodoTypes.Input) {}
}
