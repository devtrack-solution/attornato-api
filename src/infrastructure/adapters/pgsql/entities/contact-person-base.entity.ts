import { Entity, Column, ManyToOne, JoinColumn, TableInheritance } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { FreeFieldEntity } from '@/infrastructure/adapters/pgsql/entities/free-field.entity'

@Entity('contact_person')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class ContactPersonBaseEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  freeFieldOne!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  note!: string

  @ManyToOne(() => FreeFieldEntity, (freeField) => freeField.contactPerson)
  @JoinColumn({ name: 'freeFieldId', referencedColumnName: 'id' })
  freeField!: FreeFieldEntity
}
