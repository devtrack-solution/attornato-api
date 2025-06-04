import { ChildEntity } from 'typeorm'
import { ProcessBaseEntity } from '@/infrastructure/adapters/relational-database/entities/process-base.entity'

@ChildEntity('process_administrative')
export class ProcessAdministrativeEntity extends ProcessBaseEntity {}
