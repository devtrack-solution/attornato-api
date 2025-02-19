import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { MachineEntity } from '@/infrastructure/adapters/pgsql/entities/machine.entity'
import { EquipmentCategoryEntity } from '@/infrastructure/adapters/pgsql/entities/equipment-category.entity'
import { ManualEntity } from '@/infrastructure/adapters/pgsql/entities/manual.entity'


@Entity('technical_specifications')
export class TechnicalSpecificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 255 })
  manufacturer!: string

  @Column({ type: 'int' })
  manufactureYear!: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  model?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  serialNumber?: string

  @Column({ type: 'float', nullable: true })
  requiredAreaM2?: number

  @Column({ type: 'date', nullable: true })
  acquisitionAt?: Date

  @Column({ type: 'float', nullable: true })
  acquisitionValue?: number

  @Column({ type: 'float', nullable: true })
  depreciatedMarketValue?: number

  @Column({ type: 'int' })
  usefulLife!: number

  @Column({ type: 'float', nullable: true })
  energyConsumption?: number

  @OneToOne(() => MachineEntity, (machine) => machine.technicalSpecification, { onDelete: 'CASCADE' })
  machine!: MachineEntity

/*  @ManyToOne(() => EquipmentCategoryEntity, (category) => category.technicalSpecifications, { onDelete: 'SET NULL' })
  @JoinColumn()
  equipmentCategory?: EquipmentCategoryEntity*/

  @OneToMany(() => ManualEntity, (manual) => manual.technicalSpecification, { eager: false })
  manuals?: ManualEntity[]
}
