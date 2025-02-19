import { ApiProperty } from '@nestjs/swagger'

export class EquipmentCategoryDto {
  @ApiProperty({ description: 'Category name', example: 'Printer', required: true })
  name!: string

  @ApiProperty({ description: 'Category description', example: 'A machine that prints on various materials', required: false })
  description!: string

  @ApiProperty({ description: 'Short alias for the category', example: 'IM', required: true })
  alias!: string
}
