import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { FreeFieldEntity } from '@/infrastructure/adapters/pgsql/entities/free-field.entity'

@Entity('contact_person')
export class ContactPersonEntity extends EntityBase {
  @Column({ type: 'varchar', length: 255 })
  freeFieldOne!: string

  @Column({ type: 'varchar', length: 255 })
  note!: string

  @Column({ type: 'varchar', nullable: true, length: 20 })
  mobilePhone?: string

  @Column({ type: 'varchar', nullable: true, length: 20 })
  phoneNumber?: string

  @Column({ type: 'varchar', nullable: true, length: 255 })
  fatherName?: string

  @Column({ type: 'varchar', nullable: true, length: 255 })
  motherName?: string

  @ManyToOne(() => FreeFieldEntity, (freeField) => freeField.contactPerson)
  @JoinColumn({ name: 'freeFieldId', referencedColumnName: 'id' })
  freeField!: FreeFieldEntity

  @Column({ type: 'uuid', nullable: true })
  freeFieldId?: string
}
