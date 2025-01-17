import { Controller, Post, Body, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateTodoInboundPort } from '@/domain/todo/ports/inbound/create-todo.inbound-port'
import { CreateTodoDto } from '../../dtos/create-todo.dto'

@ApiTags('todos') // Attach a Swagger tag
@Controller('todos')
export class TodoHttpController {
  constructor(@Inject('CreateTodoInboundPort') private readonly createTodoService: CreateTodoInboundPort) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Todo' })
  @ApiResponse({ status: 201, description: 'The todo has been created.' })
  async create(@Body() body: CreateTodoDto) {
    return this.createTodoService.execute(body)
  }
}
