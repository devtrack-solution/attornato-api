import { OmitType } from '@nestjs/swagger'
import { CountyDto } from './county.dto'
import { CountyType } from '@/domain/process/component/county/types/county.type'

export class CreateCountyDto extends OmitType(CountyDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements CountyType.Input {}
