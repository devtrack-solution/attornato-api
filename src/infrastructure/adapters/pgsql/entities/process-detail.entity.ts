import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { FreeField1Entity } from '@/infrastructure/adapters/pgsql/entities/free-field-1.entity'
import { FreeField2Entity } from '@/infrastructure/adapters/pgsql/entities/free-field-2.entity'
import { PrognosisEntity } from '@/infrastructure/adapters/pgsql/entities/prognosis.entity'
import { DetailEntity } from '@/infrastructure/adapters/pgsql/entities/detail.entity'
import { ProcessBaseEntity } from '@/infrastructure/adapters/pgsql/entities/process-base.entity'
import { PartnerEntity } from '@/infrastructure/adapters/pgsql/entities/partner.entity'
import { OriginEntity } from '@/infrastructure/adapters/pgsql/entities/origin.entity'
import { FreeField6Entity } from '@/infrastructure/adapters/pgsql/entities/free-field-6.entity'

@Entity('process_detail')
export class ProcessDetailEntity extends EntityBase {
  @OneToOne(() => ProcessBaseEntity, (processBase) => processBase.processDetail)
  processBase!: ProcessBaseEntity

  @ManyToOne(() => DetailEntity)
  @JoinColumn({ name: 'detailId', referencedColumnName: 'id' })
  detail!: DetailEntity

  @Column({ type: 'uuid', nullable: true })
  detailId?: string

  @ManyToOne(() => FreeField1Entity)
  @JoinColumn({ name: 'freeField1Id', referencedColumnName: 'id' })
  freeField1?: FreeField1Entity

  @Column({ type: 'uuid', nullable: true })
  freeField1Id?: string

  @ManyToOne(() => FreeField2Entity)
  @JoinColumn({ name: 'freeField2Id', referencedColumnName: 'id' })
  freeField2?: FreeField2Entity

  @Column({ type: 'uuid', nullable: true })
  freeField2Id?: string

  @Column({ type: 'varchar', length: 255 })
  freeField3!: string

  @Column({ type: 'varchar', length: 255 })
  freeField4!: string

  @Column({ type: 'varchar', length: 255 })
  freeField5!: string

  @ManyToOne(() => FreeField6Entity)
  @JoinColumn({ name: 'freeField6Id', referencedColumnName: 'id' })
  freeField6?: FreeField6Entity

  @Column({ type: 'uuid', nullable: true })
  freeField6Id?: string

  @ManyToOne(() => OriginEntity)
  @JoinColumn({ name: 'originId', referencedColumnName: 'id' })
  origin!: OriginEntity

  @Column({ type: 'uuid', nullable: true })
  originId?: string

  @ManyToOne(() => PartnerEntity)
  @JoinColumn({ name: 'partnerId', referencedColumnName: 'id' })
  partner!: PartnerEntity

  @Column({ type: 'uuid', nullable: true })
  partnerId?: string

  @ManyToOne(() => PrognosisEntity)
  @JoinColumn({ name: 'prognosisId', referencedColumnName: 'id' })
  prognosis!: PrognosisEntity

  @Column({ type: 'uuid', nullable: false })
  prognosisId!: string
}
