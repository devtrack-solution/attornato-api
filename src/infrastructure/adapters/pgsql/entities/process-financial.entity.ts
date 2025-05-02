import { Entity, Column, OneToOne } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { ProcessBaseEntity } from '@/infrastructure/adapters/pgsql/entities/process-base.entity'

@Entity('process_financials')
export class ProcessFinancialEntity extends EntityBase {
  @OneToOne(() => ProcessBaseEntity, (processBase) => processBase.processFinancial)
  processBase!: ProcessBaseEntity

  @Column({ type: 'date' })
  hiring!: Date

  @Column({ type: 'date' })
  resJudicata!: Date

  @Column({ type: 'date' })
  closure!: Date

  @Column({ type: 'date' })
  sentence!: Date

  @Column({ type: 'date' })
  distribution!: Date

  @Column({ type: 'date' })
  execution!: Date

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  causeValue!: number

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  otherValue!: number

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  contingency!: number
}
