import { MaxFileSizeError } from '@/commons/errors'
import { IValidator } from '@/core/domain/validators/interfaces/validator.interface'

export class MaxFileSize implements IValidator {
  constructor(
    private readonly maxSizeInMb: number,
    private readonly value: Buffer,
  ) {}

  validate(): Error | undefined {
    const maxFileSizeInBytes = this.maxSizeInMb * 1024 * 1024
    if (this.value.length > maxFileSizeInBytes) {
      return new MaxFileSizeError(this.maxSizeInMb)
    }
  }
}
