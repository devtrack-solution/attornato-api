import { EventEmitter2 } from '@nestjs/event-emitter'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EventBase extends EventEmitter2 {
  private static instance: EventBase
  constructor() {
    super()
  }

  send(target: symbol, object: any) {
    EventBase.instance.emit(target, object)
  }

  static getInstance(): EventBase {
    if (!EventBase.instance) {
      EventBase.instance = new EventBase()
    }
    return EventBase.instance
  }
}
