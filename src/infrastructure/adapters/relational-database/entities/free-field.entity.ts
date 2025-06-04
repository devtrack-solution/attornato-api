import { Entity, Column, OneToMany } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/relational-database/entities/entity-base'
import { ContactPersonEntity } from '@/infrastructure/adapters/relational-database/entities/contact-person.entity'

@Entity('free_fields')
export class FreeFieldEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string

  @OneToMany(() => ContactPersonEntity, (contactPerson) => contactPerson.freeField)
  contactPerson!: ContactPersonEntity[]
}
