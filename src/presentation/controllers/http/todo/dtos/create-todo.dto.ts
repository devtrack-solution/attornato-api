import { ApiProperty } from '@nestjs/swagger'
import { TodoTypes } from "@/domain/todo/types/todo.types";

export class CreateTodoDto implements TodoTypes.Input {
  @ApiProperty({ description: 'The name of the todo' })
  name!: string
  @ApiProperty({ description: 'The age of the todo' })
  age!: number
  @ApiProperty({ description: 'The birthday of the todo' })
  birthday!: any
  @ApiProperty({ description: 'The height of the todo' })
  height!: number
  @ApiProperty({ description: 'The isActive of the todo' })
  isActive!: boolean
}

export class UpdateTodoDto extends CreateTodoDto implements TodoTypes.Identity {
  @ApiProperty({ description: 'The id of the todo' })
  id!: string;
}


export class CustomUpdateTodoDto implements TodoTypes.Identity, TodoTypes.CustomInputUpdate {
  @ApiProperty({ description: 'The id of the todo' })
  id!: string

  @ApiProperty({ description: 'The age of the todo' })
  age!: number

  @ApiProperty({ description: 'The height of the todo' })
  height!: number
}
