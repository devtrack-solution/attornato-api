import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import {CreateFreeFieldDto} from "@/presentation/controllers/http/free-field/dtos/create-free-field.dto";

export class ContactPersonDto extends BasicDto {
  @ApiProperty()
  freeFieldOne!: string

  @ApiProperty()
  note!: string

  @ApiProperty({ type: CreateFreeFieldDto })
  freeField!: CreateFreeFieldDto

  @ApiPropertyOptional()
  mobilePhone?: string

  @ApiPropertyOptional()
  phoneNumber?: string

  @ApiPropertyOptional()
  fatherName?: string

  @ApiPropertyOptional()
  motherName?: string
}
