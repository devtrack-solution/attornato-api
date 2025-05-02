import { ChildEntity } from 'typeorm'
import { ProcessBaseEntity } from '@/infrastructure/adapters/pgsql/entities/process-base.entity'

@ChildEntity('process_administrative')
export class ProcessAdministrativeEntity extends ProcessBaseEntity {
}
