import { Entity, Column, OneToMany } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { MachineEntity } from '@/infrastructure/adapters/pgsql/entities/machine.entity'

@Entity('machine_groups')
export class MachineGroupEntity extends EntityBase {
  @Column({ type: 'varchar', length: 40, unique: true })
  groupName!: string

  @Column({ type: 'varchar', length: 40, unique: true })
  slug!: string

  @Column({ type: 'varchar', length: 20, unique: true })
  groupCode!: string

  /*@OneToMany(() => MachineEntity, (machine) => machine.group, { cascade: true })
  machines!: MachineEntity[];*/

  @Column({ type: 'float', default: 0 })
  averageHourlyRate!: number

  @Column({ type: 'float', default: 0 })
  maxDailyProductivity!: number

  /*@Column({ type: 'json', nullable: true })
  workSchedules!: WorkScheduleType | null;*/
}
