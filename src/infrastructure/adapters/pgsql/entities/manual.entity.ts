import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { TechnicalSpecificationEntity } from '@/infrastructure/adapters/pgsql/entities/technical-specification.entity'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'

@Entity('manuals')
export class ManualEntity extends EntityBase {
  @Column({ type: 'varchar', length: 255 })
  link!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @ManyToOne(() => TechnicalSpecificationEntity, (spec) => spec.manuals, { onDelete: 'CASCADE', cascade: true })
  technicalSpecification!: TechnicalSpecificationEntity
}
