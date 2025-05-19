import { OmitType } from '@nestjs/swagger'
import { SubjectDto } from './subject.dto'
import { SubjectType } from '@/domain/process/component/subject/types/subject.type'

export class CreateSubjectDto extends OmitType(SubjectDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements SubjectType.Input {}
