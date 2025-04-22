import { ChildEntity, Column } from 'typeorm'
import { ContactPersonLegalEntity } from "./contact-person-legal.entity";

@ChildEntity('contact_person_individual')
export class ContactPersonIndividualEntity extends ContactPersonLegalEntity {
  @Column({ type: 'varchar',  length: 20 })
  mobilePhone!: string

  @Column({ type: 'varchar', length: 20 })
  phoneNumber!: string

  @Column({ type: 'varchar', length: 255 })
  fatherName!: string

  @Column({ type: 'varchar', length: 255 })
  motherName!: string
}
