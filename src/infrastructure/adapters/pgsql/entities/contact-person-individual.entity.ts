import { ChildEntity, Column } from 'typeorm'
import { ContactPersonLegalEntity } from "@/infrastructure/adapters/pgsql/entities/contact-person-legal.entity";


@ChildEntity('contact_person_individual')
export class ContactPersonIndividualEntity extends ContactPersonLegalEntity {
  @Column({ type: 'varchar', length: 255 })
  contact!: string

  @Column({ type: 'varchar', length: 255 })
  contactPhone!: string

  @Column({ type: 'varchar', length: 255 })
  fatherName!: string

  @Column({ type: 'varchar', length: 255 })
  motherName!: string
}
