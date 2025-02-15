import { Injectable, OnModuleInit } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { TodoCreatedEventSymbol } from '@/application/services/todo/events/todo-created.event'

@Injectable()
export class NotificationService implements OnModuleInit {
  onModuleInit() {
    console.log('✅ NotificationService initialized')
  }

  @OnEvent(TodoCreatedEventSymbol.toString(), { async: true })
  async handleTodoCreated(event: any) {
    console.log(`📩 Sending notification: ${JSON.stringify(event)}`)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}
