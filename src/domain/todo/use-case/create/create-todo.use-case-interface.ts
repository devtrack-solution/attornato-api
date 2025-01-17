import { Todo } from '@/domain/todo/types/todo.types'
import { ServiceIntegrate } from '@/commons/services/basic-service'

export interface ICreateTodoUseCase extends ServiceIntegrate<Todo.Input, Todo.Output> {}
