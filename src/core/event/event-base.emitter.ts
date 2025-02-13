import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventBase {
  private readonly eventEmitter: EventEmitter2;

  constructor(eventEmitter: EventEmitter2) {
    this.eventEmitter = eventEmitter;
  }

  /**
   * Emits an event with a symbol-based key
   * @param event - Symbol representing the event
   * @param payload - Data to send
   */
  send(event: symbol, payload: any): void {
    this.eventEmitter.emit(event, payload);
  }

  /**
   * Listens to an event with a callback
   * @param event - Symbol representing the event
   * @param callback - Function to execute when the event occurs
   */
  listen<T>(event: symbol, callback: (payload: T) => void): void {
    this.eventEmitter.on(event, callback);
  }

  /**
   * Listens to an event only once
   * @param event - Symbol representing the event
   * @param callback - Function to execute when the event occurs
   */
  listenOnce<T>(event: symbol, callback: (payload: T) => void): void {
    this.eventEmitter.once(event, callback);
  }

  /**
   * Removes a specific listener from an event
   * @param event - Symbol representing the event
   * @param callback - The function to remove
   */
  removeListener(event: symbol, callback: (...args: any[]) => void): void {
    this.eventEmitter.off(event, callback);
  }

  /**
   * Removes all listeners for a given event
   * @param event - Symbol representing the event
   */
  removeAll(event: symbol): void {
    this.eventEmitter.removeAllListeners(event);
  }
}
