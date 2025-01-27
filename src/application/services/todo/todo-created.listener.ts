import { TodoCreatedEvent, TodoCreatedEventSymbol } from '@/application/services/todo/todo-created.event'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

@Injectable()
export class TodoCreatedListener {
  constructor() {
    console.log('TodoCreatedListener initialized')
  }
  @OnEvent(TodoCreatedEventSymbol)
  handleUserCreatedEvent(event: TodoCreatedEvent) {
    // Logic to handle the event (e.g., sending a welcome email)
    console.log(`Todo created: ${event.data}`)
  }
}
