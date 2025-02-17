/**
 * Created by Wilton Oliveira Ferreira on 24/01/2023
 */

import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn, Index, DeleteDateColumn, PrimaryColumn } from 'typeorm'

/**
 * Abstract base class for business-objects with common fields such as ID, creation date, update date, deletion date, and more.
 */
export abstract class EntityBase extends BaseEntity {
  /**
   * Unique identifier for the entity.
   */
  @PrimaryColumn({ type: 'uuid' })
  id!: string

  /**
   * Date and time when the entity was created.
   */
  @CreateDateColumn({ name: 'created_at' })
  @Index({ unique: false })
  createdAt!: Date

  /**
   * Date and time when the entity was last updated.
   */
  @UpdateDateColumn({ name: 'updated_at' })
  @Index({ unique: false })
  updatedAt!: Date

  /**
   * Date and time when the entity was deleted.
   */
  @DeleteDateColumn({ name: 'deleted_at' })
  @Index({ unique: false })
  deletedAt!: Date

  /**
   * Indicates whether the entity is active.
   */
  @Column({
    name: 'is_active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  @Index({ unique: false })
  enable!: boolean

  /**
   * Identifier of the user who last updated the entity.
   */
  @Column({ name: 'last_change_by_user_id', nullable: true })
  @Index({ unique: false })
  lastUpdatedByUser!: string

  /**
   * Identifier of the user who last updated the entity.
   */
  @Column({ name: 'created_by_user_id', nullable: true })
  @Index({ unique: false })
  createdByUser!: string
}
