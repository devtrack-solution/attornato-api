import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
export class EventQueueService {
  private queue: { event: symbol; payload: any }[] = []
  private processing = false

  constructor(private readonly eventEmitter: EventEmitter2) {
    console.log('✅ EventQueueService initialized')
  }

  /**
   * Adds an event to the queue
   * @param event - The symbol representing the event
   * @param payload - The event payload
   */
  enqueue(event: symbol, payload: any) {
    this.queue.push({ event, payload })
    this.processQueue().then((processing) => {})
  }

  /**
   * Processes the queue sequentially
   */
  private async processQueue() {
    if (this.processing) return

    this.processing = true
    while (this.queue.length > 0) {
      const { event, payload } = this.queue.shift()!

      try {
        console.log(`Processing event: ${String(event)}`)
        await this.eventEmitter.emitAsync(event.toString(), payload)
      } catch (error) {
        console.error(`Error processing event ${String(event)}:`, error)
      }
    }
    this.processing = false
  }
}
