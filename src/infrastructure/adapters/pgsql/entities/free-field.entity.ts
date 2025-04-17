import { Entity, Column, OneToMany } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { ContactPersonLegalEntity } from '@/infrastructure/adapters/pgsql/entities/contact-person-legal.entity'

@Entity('free-fields')
export class FreeFieldEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string

  @OneToMany(() => ContactPersonLegalEntity, (contactPerson) => contactPerson.freeField)
  contactPerson!: ContactPersonLegalEntity[]
}
