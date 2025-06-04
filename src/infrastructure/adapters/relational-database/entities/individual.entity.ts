import { ChildEntity, Column } from 'typeorm'
import { ClientBaseEntity } from '@/infrastructure/adapters/relational-database/entities/client-base.entity'

@ChildEntity('client-individual')
export class IndividualEntity extends ClientBaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Column({ type: 'varchar', length: 255 })
  nationality!: string

  @Column({ type: 'varchar', length: 255 })
  occupation!: string

  @Column({ type: 'varchar', length: 255 })
  educationLevel!: string

  @Column({ type: 'varchar', length: 255 })
  maritalStatus!: string

  @Column({ type: 'date', nullable: false })
  birthDate!: Date

  @Column({ type: 'varchar', unique: true, length: 20 })
  cpf!: string

  @Column({ type: 'varchar', length: 20 })
  rg!: string

  @Column({ type: 'varchar', unique: true, length: 20 })
  pis!: string
}
