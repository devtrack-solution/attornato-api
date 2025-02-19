import { ApiProperty } from '@nestjs/swagger'
import { EquipmentCategoryDto } from '@/presentation/controllers/http/machine/dtos/equipment-category.dto'
import { ManualDto } from '@/presentation/controllers/http/machine/dtos/manual.dto'


export class TechnicalSpecificationDto {
  @ApiProperty({ description: 'Manufacturer of the machine', example: 'LaserTech', required: true })
  manufacturer!: string

  @ApiProperty({ description: 'Year of manufacture', example: 2022, required: true })
  manufactureYear!: number

  @ApiProperty({ description: 'Machine model', example: 'LT-5000', required: false })
  model?: string

  @ApiProperty({ description: 'Serial number', example: 'SN123456', required: false })
  serialNumber?: string

  @ApiProperty({ description: 'Required area in square meters', example: 10, required: false })
  requiredAreaM2?: number

  @ApiProperty({ description: 'Date of acquisition', example: '2023-01-15', required: false })
  acquisitionAt?: Date

  @ApiProperty({ description: 'Acquisition value', example: 50000, required: false })
  acquisitionValue?: number

  @ApiProperty({ description: 'Depreciated market value', example: 30000, required: false })
  depreciatedMarketValue?: number

  @ApiProperty({ description: 'Useful life of the machine in years', example: 10, required: true })
  usefulLife!: number

  @ApiProperty({ description: 'Energy consumption (watts)', example: 500, required: true })
  energyConsumption!: number

/*  @ApiProperty({ description: 'Equipment category details', required: false, type: EquipmentCategoryDto })
  equipmentCategory?: EquipmentCategoryDto*/

  @ApiProperty({ description: 'List of manuals related to the machine', required: false, type: [ManualDto] })
  manuals?: ManualDto[]
}
