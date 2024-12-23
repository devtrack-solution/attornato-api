import { Injectable, type PipeTransform, type ArgumentMetadata, BadRequestException } from '@nestjs/common'

@Injectable()
export class ParseBooleanPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && typeof value === 'object' && value !== null) {
      ;['isActive', 'relationshipIsActive'].forEach((field) => {
        if (value[field] !== undefined) {
          if (typeof value[field] === 'string') {
            if (value[field].toLowerCase() === 'true') {
              value[field] = true
            } else if (value[field].toLowerCase() === 'false') {
              value[field] = false // Define explicitly as false
            } else {
              throw new BadRequestException(`Invalid boolean value for ${field}`)
            }
          } else if (typeof value[field] !== 'boolean') {
            throw new BadRequestException(`Invalid boolean value for ${field}`)
          }
        }
      })
    }
    return value
  }
}
