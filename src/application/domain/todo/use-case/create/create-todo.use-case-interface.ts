import { ServiceIntegrate } from '@/commons/services/basic-service'
import { Todo } from '@/domain/todo/types/todo.types'

export interface ICreateTodoUseCase extends ServiceIntegrate<Todo.Input, Todo.Output> {}
