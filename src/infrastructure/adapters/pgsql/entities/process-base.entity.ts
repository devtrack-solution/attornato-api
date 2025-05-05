import { Column, Entity, JoinColumn, ManyToOne, OneToOne, TableInheritance } from 'typeorm'
import { ClientBaseEntity } from '@/infrastructure/adapters/pgsql/entities/client-base.entity'

import { GroupProcessEntity } from '@/infrastructure/adapters/pgsql/entities/group-process.entity'
import { LocalProcedureNameEntity } from '@/infrastructure/adapters/pgsql/entities/local-procedure-name.entity'
import { ProceduralStatusEntity } from '@/infrastructure/adapters/pgsql/entities/procedural-status.entity'
import { CountyEntity } from '@/infrastructure/adapters/pgsql/entities/county.entity'
import { PhaseEntity } from '@/infrastructure/adapters/pgsql/entities/phase.entity'
import { PracticeAreaEntity } from '@/infrastructure/adapters/pgsql/entities/practice-area.entity'
import { ResponsibleEntity } from '@/infrastructure/adapters/pgsql/entities/responsible.entity'
import { ActionObjectEntity } from '@/infrastructure/adapters/pgsql/entities/action-object.entity'
import { LocatorEntity } from '@/infrastructure/adapters/pgsql/entities/locator.entity'
import { SubjectEntity } from '@/infrastructure/adapters/pgsql/entities/subject.entity'
import { ProcessFinancialEntity } from '@/infrastructure/adapters/pgsql/entities/process-financial.entity'
import { ProcessDetailEntity } from '@/infrastructure/adapters/pgsql/entities/process-detail.entity'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'

@Entity({ name: 'processes'})
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class ProcessBaseEntity extends EntityBase {
  @ManyToOne(() => ClientBaseEntity)
  @JoinColumn({ name: 'clientId', referencedColumnName: 'id' })
  client!: ClientBaseEntity

  @Column({ type: 'uuid', nullable: false })
  clientId!: string

  @Column()
  processId!: string

  @ManyToOne(() => GroupProcessEntity, { eager: true })
  @JoinColumn({ name: 'groupProcessId' })
  groupProcess!: GroupProcessEntity

  @Column({ type: 'uuid', nullable: false })
  groupProcessId!: string

  @Column({ type: 'integer', nullable: false })
  folder!: number

  @Column({ type: 'varchar', length: 255})
  label!: string

  @Column({ default: false })
  favorite!:  boolean

  @Column({ default: "Aguardando numeração", length: 255 })
  processNumber!:  string

  @Column({ type: 'integer' })
  localProcedureNumber!:  number

  @ManyToOne(() => LocalProcedureNameEntity, { eager: true })
  @JoinColumn({ name: 'localProcedureNameId', referencedColumnName: 'id' })
  localProcedureName!:  LocalProcedureNameEntity

  @Column({ type: 'uuid', nullable: true })
  localProcedureNameId!: string

  @ManyToOne(() => ProceduralStatusEntity, { eager: true })
  @JoinColumn({ name: 'proceduralStatusId', referencedColumnName: 'id' })
  proceduralStatus!:  ProceduralStatusEntity

  @Column({ type: 'uuid', nullable: true })
  proceduralStatusId!: string

  @ManyToOne(() => CountyEntity, { eager: true })
  @JoinColumn({ name: 'countyId', referencedColumnName: 'id' })
  county!:  CountyEntity

  @Column({ type: 'uuid', nullable: true })
  countyId!: string

  @Column({ type: "varchar" , length: 10 })
  countyUf!:  string

  @Column({ nullable: true })
  request!: string

  @Column({ nullable: true })
  note!: string

  @Column({ nullable: true, default: false })
  justiceSecret!: boolean

  @Column({ nullable: true, default: false })
  captureProcedures!: boolean

  @ManyToOne(() => PhaseEntity, { eager: true })
  @JoinColumn({ name: 'phaseId', referencedColumnName: 'id' })
  phase!:  PhaseEntity

  @Column({ type: 'uuid', nullable: true })
  phaseId!: string

  @ManyToOne(() => PracticeAreaEntity, { eager: true })
  @JoinColumn({ name: 'practiceAreaId', referencedColumnName: 'id' })
  practiceArea!:  PracticeAreaEntity

  @Column({ type: 'uuid', nullable: true })
  practiceAreaId!: string

  @ManyToOne(() => ResponsibleEntity, { eager: true })
  @JoinColumn({ name: 'responsibleId', referencedColumnName: 'id' })
  responsible!:  ResponsibleEntity

  @Column({ type: 'uuid', nullable: true })
  responsibleId!: string

  @ManyToOne(() => ActionObjectEntity, { eager: true })
  @JoinColumn({ name: 'actionObjectId', referencedColumnName: 'id' })
  actionObject!:  ActionObjectEntity

  @Column({ type: 'uuid', nullable: true })
  actionObjectId!: string

  @ManyToOne(() => LocatorEntity, { eager: true })
  @JoinColumn({ name: 'locatorId', referencedColumnName: 'id' })
  locator!:  LocatorEntity

  @Column({ type: 'uuid', nullable: true })
  locatorId!: string

  @ManyToOne(() => SubjectEntity, { eager: true })
  @JoinColumn({ name: 'subjectId', referencedColumnName: 'id' })
  subject!:  SubjectEntity

  @Column({ type: 'uuid', nullable: true })
  subjectId!: string

  @OneToOne(() => ProcessFinancialEntity, (processFinancial) => processFinancial.processBase, { eager: true })
  @JoinColumn({ name: 'processFinancialId', referencedColumnName: 'id' })
  processFinancial!: ProcessFinancialEntity

  @Column({ type: 'uuid', nullable: true })
  processFinancialId?: string

  @OneToOne(() => ProcessDetailEntity, (processDetail) => processDetail.processBase, { eager: true })
  @JoinColumn({ name: 'processDetailId', referencedColumnName: 'id' })
  processDetail?: ProcessDetailEntity

  @Column({ type: 'uuid', nullable: true })
  processDetailId?: string
}
