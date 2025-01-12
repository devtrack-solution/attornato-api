import { Todo } from "@/application/domain/todo/types/todo.types";
import { ServiceIntegrate } from "@/application/commons/services/basic-service";


export interface ICreateTodoUseCase extends ServiceIntegrate<Todo.Input, Todo.Output> {}