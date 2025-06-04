import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/relational-database/entities/entity-base'
import { FreeFieldEntity } from '@/infrastructure/adapters/relational-database/entities/free-field.entity'
import { PersonEntity } from '@/infrastructure/adapters/relational-database/entities/person.entity'

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

  @ManyToOne(() => FreeFieldEntity, (freeField) => freeField.contactPerson, { eager: true })
  @JoinColumn({ name: 'freeFieldId', referencedColumnName: 'id' })
  freeField!: FreeFieldEntity

  @Column({ type: 'uuid', nullable: true })
  freeFieldId?: string

  @OneToOne(() => PersonEntity, (person) => person.contactPerson)
  person?: PersonEntity
}
