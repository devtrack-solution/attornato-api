import { Controller, Post, Body, Inject, Get, Put, Param, UseFilters } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger'
import { CreateTodoInboundPort, CreateTodoInputPortToken } from '@/domain/todo/ports/inbound/create-todo.inbound-port'
import { CreateTodoDto, UpdateTodoDto } from '@/presentation/controllers/http/todo/dtos/create-todo.dto'
import { UpdateTodoInboundPort, UpdateTodoInputPortToken } from '@/domain/todo/ports/inbound/update-todo.inbound-port'
import { ValidationExceptionFilter } from '@/core/presentation/filters/validation-exception.filter'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'

@ApiTags('todos')
@ApiHeader({
  name: 'x-idempotency-key',
  description: 'A unique key to ensure idempotency for the request',
  required: true,
})
@UseFilters(ValidationExceptionFilter)
@Controller('todos')
export class TodoHttpController {
  constructor(
    @Inject(CreateTodoInputPortToken) private readonly createTodoService: CreateTodoInboundPort,
    @Inject(UpdateTodoInputPortToken) private readonly updateTodoService: UpdateTodoInboundPort,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Todo' })
  @ApiResponse({ status: 201, description: 'The todo has been created.' })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
    type: ValidationErrorResponse,
  })
  async create(@Body() body: CreateTodoDto) {
    return this.createTodoService.execute(body)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a new Todo' })
  @ApiResponse({ status: 200, description: 'The todo has been updated.' })
  async update(@Param('id') id: string, @Body() body: UpdateTodoDto) {
    return this.updateTodoService.execute({ ...body, id })
  }

  @Get()
  @ApiOperation({ summary: 'Find an Todo' })
  async find(@Body() body: CreateTodoDto) {
    return this.createTodoService.execute(body)
  }
}
