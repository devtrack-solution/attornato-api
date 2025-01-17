import { ApiProperty } from '@nestjs/swagger'

export class CreateTodoDto {
  // id: string | undefined
  // @ApiProperty({ description: 'The name of the todo' })
  // name: string | undefined
  // @ApiProperty({ description: 'The age of the todo' })
  // age: number | undefined
  // @ApiProperty({ description: 'The birthday of the todo' })
  // birthday: any
  // @ApiProperty({ description: 'The height of the todo' })
  // height: number | undefined
  // @ApiProperty({ description: 'The isActive of the todo' })
  // isActive: boolean | undefined

  @ApiProperty({ description: 'The title of the todo' })
  title!: string
}
