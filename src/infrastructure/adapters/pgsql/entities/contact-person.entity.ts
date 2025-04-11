import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { FreeFieldEntity } from '@/infrastructure/adapters/pgsql/entities/free-field.entity'
import { LegalEntity } from '@/infrastructure/adapters/pgsql/entities/legal.entity'

@Entity('contact_person')
export class ContactPersonEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  freeFieldOne!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  note!: string

  @ManyToOne(() => FreeFieldEntity, (freeField) => freeField.contactPerson)
  @JoinColumn({ name: 'freeFieldId', referencedColumnName: 'id' })
  freeField!: FreeFieldEntity

  @OneToOne(() => LegalEntity, (legal) => legal.communicationAddress)
  legal!: LegalEntity
}
