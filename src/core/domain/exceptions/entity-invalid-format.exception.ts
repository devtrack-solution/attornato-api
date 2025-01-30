import { HttpException, HttpStatus } from '@nestjs/common'

export class EntityInvalidFormatException extends HttpException {
  public errors: any[]

  constructor(errorDetails: { message: string; errors: any[] }) {
    super(errorDetails, HttpStatus.BAD_REQUEST)
    this.errors = errorDetails.errors
  }
}
