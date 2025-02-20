import { ApiProperty } from '@nestjs/swagger';

export class PatchMachineGroupDto {
  @ApiProperty({ description: 'Updated name of the machine group', example: 'Heavy Excavators', required: false })
  groupName?: string;

  @ApiProperty({ description: 'Updated slug for the machine group', example: 'heavy-excavators', required: false })
  slug?: string;
}
