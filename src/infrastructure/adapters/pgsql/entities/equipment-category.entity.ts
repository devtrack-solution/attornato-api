import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { MachineEntity } from '@/infrastructure/adapters/pgsql/entities/machine.entity'
import { TechnicalSpecificationEntity } from '@/infrastructure/adapters/pgsql/entities/technical-specification.entity'

@Entity('equipment_categories')
export class EquipmentCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Column({ type: 'text' })
  description!: string

  @Column({ type: 'varchar', length: 100 })
  alias!: string

  /*  @OneToMany(() => TechnicalSpecificationEntity, (spec) => spec.equipmentCategory)
  technicalSpecifications!: TechnicalSpecificationEntity[]*/
}
