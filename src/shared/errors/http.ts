import { BadRequestException, ForbiddenException, InternalServerErrorException, UnauthorizedException, NotFoundException, ConflictException } from '@nestjs/common'

export class ServerError extends InternalServerErrorException {
  constructor(message: any) {
    super(message)
    this.name = 'ServerError'
    this.stack = message
  }
}

export class UnauthorizedError extends UnauthorizedException {
  constructor(message: string) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends ForbiddenException {
  constructor(message: string) {
    super(message)
    this.name = 'ForbiddenError'
  }
}

export class BadRequestError extends BadRequestException {
  constructor() {
    super('BadRequestError: Unespected error')
    this.name = 'BadRequestError'
  }
}

export class NotFoundError extends NotFoundException {
  constructor() {
    super('NotFoundError: Registr not found')
    this.name = 'NotFoundError'
  }
}

export class EmailConflictExceptionError extends ConflictException {
  constructor() {
    super('EmailConflictExceptionError:Conflict with use existent email address')
    this.name = 'EmailConflictExceptionError'
  }
}
