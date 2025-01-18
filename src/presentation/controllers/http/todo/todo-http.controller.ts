import { Controller, Post, Body, Inject, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger'
import { CreateTodoInboundPort, CreateTodoInputPortToken } from '@/domain/todo/ports/inbound/create-todo.inbound-port'
import { CreateTodoDto } from '@/presentation/controllers/http/todo/dtos/create-todo.dto'

@ApiTags('todos')
@ApiHeader({
  name: 'x-idempotency-key',
  description: 'A unique key to ensure idempotency for the request',
  required: true,
})
@Controller('todos')
export class TodoHttpController {
  constructor(@Inject(CreateTodoInputPortToken) private readonly createTodoService: CreateTodoInboundPort) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Todo' })
  @ApiResponse({ status: 201, description: 'The todo has been created.' })
  async create(@Body() body: CreateTodoDto) {
    return this.createTodoService.execute(body)
  }

  @Get()
  @ApiOperation({ summary: 'Find an Todo' })
  async find(@Body() body: CreateTodoDto) {
    return this.createTodoService.execute(body)
  }
}
