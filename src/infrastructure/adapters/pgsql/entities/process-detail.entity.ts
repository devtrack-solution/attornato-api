import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { FreeField1Entity } from '@/infrastructure/adapters/pgsql/entities/free-field-1.entity'
import { FreeField2Entity } from '@/infrastructure/adapters/pgsql/entities/free-field-2.entity'
import { GroupProcessEntity } from '@/infrastructure/adapters/pgsql/entities/group-process.entity'
import { PrognosisEntity } from '@/infrastructure/adapters/pgsql/entities/prognosis.entity'
import { DetailEntity } from '@/infrastructure/adapters/pgsql/entities/detail.entity'
import { ProcessBaseEntity } from '@/infrastructure/adapters/pgsql/entities/process-base.entity'

@Entity('process_detail')
export class ProcessDetailEntity extends EntityBase {
  @OneToOne(() => ProcessBaseEntity, (processBase) => processBase.processDetail)
  processBase!: ProcessBaseEntity

  @ManyToOne(() => DetailEntity)
  @JoinColumn({ name: 'detailId' })
  detail!: DetailEntity

  @Column({ type: 'uuid', nullable: false })
  detailId!: string

  @ManyToOne(() => FreeField1Entity)
  @JoinColumn({ name: 'freeField1Id' })
  freeField1?: FreeField1Entity

  @Column({ type: 'uuid', nullable: false })
  freeField1Id?: string

  @ManyToOne(() => FreeField2Entity)
  @JoinColumn({ name: 'freeField2Id' })
  freeField2?: FreeField2Entity

  @Column({ type: 'uuid', nullable: false })
  freeField2Id?: string

  @Column({ type: 'varchar', length: 255 })
  freeField3!: string

  @Column({ type: 'varchar', length: 255 })
  freeField4!: string

  @Column({ type: 'varchar', length: 255 })
  freeField5!: string

  @ManyToOne(() => GroupProcessEntity)
  @JoinColumn({ name: 'freeField6Id' })
  freeField6?: GroupProcessEntity

  @Column({ type: 'uuid', nullable: false })
  freeField6Id?: string

  @ManyToOne(() => GroupProcessEntity)
  @JoinColumn({ name: 'originId' })
  origin!: GroupProcessEntity

  @Column({ type: 'uuid', nullable: false })
  originId!: string

  @ManyToOne(() => GroupProcessEntity)
  @JoinColumn({ name: 'partnerId' })
  partner!: GroupProcessEntity

  @Column({ type: 'uuid', nullable: false })
  partnerId!: string

  @ManyToOne(() => PrognosisEntity)
  @JoinColumn({ name: 'prognosisId' })
  prognosis!: PrognosisEntity

  @Column({ type: 'uuid', nullable: false })
  prognosisId!: string
}
