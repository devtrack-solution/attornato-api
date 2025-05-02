import { OmitType } from '@nestjs/swagger'
import { ProcessFinancialDto } from '@/presentation/controllers/http/process/component/process-financial/dtos/process-financial.dto'
import { ProcessFinancialType } from '@/domain/process/component/process-financial/types/process-financial.type'

export class CreateProcessFinancialDto
  extends OmitType(ProcessFinancialDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements ProcessFinancialType.Input {}
