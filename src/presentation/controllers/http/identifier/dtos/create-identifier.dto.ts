import { OmitType } from '@nestjs/swagger'
import { IdentifierDto } from './identifier.dto'
import { IdentifierType } from '@/domain/identifier/types/identifier.type'

export class CreateIdentifierDto extends OmitType(IdentifierDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements IdentifierType.Input {}
