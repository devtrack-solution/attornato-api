export const CreateTodoInputPortToken = Symbol.for('CreateTodoInputPortToken')

export interface CreateTodoInboundPort {
  execute(data: { title: string }): {}
}
