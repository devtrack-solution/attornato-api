import { ChildEntity, Column } from 'typeorm'
import { ClientBaseEntity } from '@/infrastructure/adapters/relational-database/entities/client-base.entity'

@ChildEntity('client-legal')
export class LegalEntity extends ClientBaseEntity {
  @Column({ type: 'varchar', length: 255 })
  responsible!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  companyName!: string

  @Column({ type: 'varchar', length: 255 })
  tradeName!: string

  @Column({ type: 'varchar', length: 255 })
  businessArea!: string

  @Column({ type: 'varchar', unique: true, length: 20 })
  cnpj!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  stateRegistration!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  municipalRegistration!: string
}
