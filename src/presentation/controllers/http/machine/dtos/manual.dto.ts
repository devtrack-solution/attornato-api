import { ApiProperty } from '@nestjs/swagger'

export class ManualDto {
  @ApiProperty({ description: 'URL link to the manual', example: 'https://xyz.com/manual.pdf', required: true })
  link!: string

  @ApiProperty({ description: 'Description of the manual', example: 'User Guide', required: true })
  description!: string
}
