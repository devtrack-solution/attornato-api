import { Todo } from "@/domain/types/todo.types";
import { ServiceIntegrate } from "@/commons/services/basic-service";


export interface ICreateTodoUseCase extends ServiceIntegrate<Todo.Input, Todo.Output> {}