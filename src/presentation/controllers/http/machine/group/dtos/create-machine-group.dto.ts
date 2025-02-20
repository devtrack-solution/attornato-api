import { ApiProperty } from '@nestjs/swagger';

export class CreateMachineGroupDto {
  @ApiProperty({ description: 'Name of the machine group', example: 'Heavy Excavators', required: true })
  groupName!: string;

  @ApiProperty({ description: 'Slug for the machine group', example: 'heavy-excavators', required: true })
  slug!: string;

  @ApiProperty({ description: 'Unique group code', example: 'TEX1234S1', required: true })
  groupCode!: string;
}