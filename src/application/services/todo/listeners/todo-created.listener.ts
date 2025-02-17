import { TodoCreatedEvent, TodoCreatedEventSymbol } from '@/application/services/todo/events/todo-created.event'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

@Injectable()
export class TodoCreatedListener implements OnModuleInit {
  onModuleInit() {
    console.log('✅ TodoCreatedListener initialized')
  }

  @OnEvent(TodoCreatedEventSymbol.toString())
  handleUserCreatedEvent(event: TodoCreatedEvent) {
    console.log(`✅ Todo created: ${JSON.stringify(event.data)}`)
  }
}
