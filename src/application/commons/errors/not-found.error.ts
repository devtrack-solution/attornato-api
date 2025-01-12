import { NotFoundException } from "@nestjs/common";


export class NotFoundError extends NotFoundException {
  constructor() {
    super('NotFoundError: Registr not found')
    this.name = 'NotFoundError'
  }
}