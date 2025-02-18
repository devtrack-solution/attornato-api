import { Entity, Column } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'

@Entity('machines')
export class MachineEntity extends EntityBase {
  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Column({ type: 'varchar', length: 255 })
  description!: string

  @Column({ type: 'varchar', length: 20, unique: true })
  machineCode!: string

  /*
    @Column({ type: 'uuid' })
    machineGroupId!: string
  */

  @Column({ type: 'varchar', length: 50 })
  status!: string
  /*
    @OneToOne(() => TechnicalSpecification, { cascade: true })
    @JoinColumn()
    technicalSpecification!: TechnicalSpecification

    @OneToOne(() => Location, { cascade: true })
    @JoinColumn()
    location!: Location

    @OneToOne(() => ProductionCapacity, { cascade: true })
    @JoinColumn()
    productionCapacity!: ProductionCapacity

    @OneToMany(() => Operator, (operator) => operator.machine, { cascade: true })
    operators!: Operator[]

    @OneToMany(() => Maintenance, (maintenance) => maintenance.machine, { cascade: true })
    maintenances!: Maintenance[]*/
}
