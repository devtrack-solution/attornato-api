import { ChildEntity } from 'typeorm'
import { ContactPersonEntity } from '@/infrastructure/adapters/pgsql/entities/contact-person.entity'

@ChildEntity('contact_person_legal')
export class ContactPersonLegalEntity extends ContactPersonEntity {}
