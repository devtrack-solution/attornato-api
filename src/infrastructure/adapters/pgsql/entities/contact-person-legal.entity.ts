import { ChildEntity } from 'typeorm'
import { ContactPersonBaseEntity } from './contact-person-base.entity'

@ChildEntity('contact_person_legal')
export class ContactPersonLegalEntity extends ContactPersonBaseEntity {}
