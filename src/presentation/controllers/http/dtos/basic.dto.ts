import { ApiProperty } from '@nestjs/swagger'

export class BasicDto {
  @ApiProperty({
    description: 'Unique identifier of the entity',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    required: false,
  })
  id?: string

  @ApiProperty({
    description: 'Unique identifier of the user who owns this entity',
    example: 'a6df1b88-1a5b-4c2e-97bc-849f8f345e87',
    required: false,
  })
  userId?: string

  @ApiProperty({
    description: 'Unique identifier of the last user who updated this entity',
    example: 'bd8a7d4c-2f69-4b88-b3a2-dfd0f3a9e372',
    required: false,
  })
  lastUpdatedUserId?: string

  @ApiProperty({
    description: 'Unique identifier of the user who created this entity',
    example: 'f1a2b3c4-d5e6-7f89-0a1b-2c3d4e5f6789',
    required: false,
  })
  createdUserId?: string

  @ApiProperty({
    description: 'Timestamp when the entity was created',
    example: '2024-02-23T14:30:00.000Z',
    required: false,
  })
  createdAt?: Date

  @ApiProperty({
    description: 'Timestamp when the entity was last updated',
    example: '2024-02-24T09:45:00.000Z',
    required: false,
  })
  updatedAt?: Date

  @ApiProperty({
    description: 'Timestamp when the entity was deleted (null if not deleted)',
    example: null,
    required: false,
  })
  deletedAt?: Date

  @ApiProperty({
    description: 'Indicates whether the entity is active',
    example: true,
    required: false,
  })
  enable?: boolean
}
