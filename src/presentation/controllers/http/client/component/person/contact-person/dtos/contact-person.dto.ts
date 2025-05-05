import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import {CreateFreeFieldDto} from "@/presentation/controllers/http/client/component/person/contact-person/free-field/dtos/create-free-field.dto";

export class ContactPersonDto extends BasicDto {
  @ApiProperty({ example: 'Teste' })
  freeFieldOne!: string

  @ApiProperty({ example: 'Observado que' })
  note!: string

  @ApiPropertyOptional({ type: CreateFreeFieldDto })
  freeField?: CreateFreeFieldDto

  @ApiProperty()
  freeFieldId?: string

  @ApiPropertyOptional({ example: '(61) 9 8887-7766' })
  mobilePhone?: string

  @ApiPropertyOptional({ example: '(61) 8887-7766' })
  phoneNumber?: string

  @ApiPropertyOptional({ example: 'Jorge Silva' })
  fatherName?: string

  @ApiPropertyOptional({ example: 'Maria Silva' })
  motherName?: string
}
