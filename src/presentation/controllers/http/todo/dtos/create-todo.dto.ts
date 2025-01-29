import { ApiProperty } from '@nestjs/swagger'
import { TodoType } from '@/domain/todo/types/todo.type'

export class CreateTodoDto implements TodoType.Input {
  @ApiProperty({ description: 'The name of the todo' })
  name!: string
  @ApiProperty({ description: 'The email of the todo' })
  email!: string
  @ApiProperty({ description: 'The age of the todo' })
  age!: number
  @ApiProperty({ description: 'The birthday of the todo' })
  birthday!: Date
  @ApiProperty({ description: 'The height of the todo' })
  height!: number
  @ApiProperty({ description: 'The isActive of the todo' })
  enable!: boolean
}

export class UpdateTodoDto extends CreateTodoDto implements TodoType.Input {
  @ApiProperty({ description: 'The id of the todo' })
  id!: string
}

export class CustomUpdateTodoDto implements TodoType.CustomInputUpdate {
  @ApiProperty({ description: 'The id of the todo' })
  id!: string

  @ApiProperty({ description: 'The age of the todo' })
  age!: number

  @ApiProperty({ description: 'The height of the todo' })
  height!: number
}
