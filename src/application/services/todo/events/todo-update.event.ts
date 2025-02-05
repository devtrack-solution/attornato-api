import { TodoType } from '@/domain/todo/types/todo.type'

export const TodoUpdatedEventSymbol = Symbol('event:todo.updated')

export class TodoUpdatedEvent {
  constructor(public readonly data: TodoType.Input) {}
}
