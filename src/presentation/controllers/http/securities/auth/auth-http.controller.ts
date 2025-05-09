import { Controller, Post, Body, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { LoginAuthDto } from '@/presentation/controllers/http/securities/auth/dtos/login-auth.dto'
import { LoginAuthInboundPort, LoginAuthInboundPortToken } from '@/domain/securities/ports/inbound/login-auth.inbound-port'

@ApiTags('Auth')
@Controller('auth')
export class AuthHttpController extends BaseHttpController {
  constructor(
    @Inject(LoginAuthInboundPortToken) private readonly createAuthService: LoginAuthInboundPort,
    // @Inject(ListAuthInboundPortToken) private readonly listAuthService: ListAuthInboundPort,
    // @Inject(PatchAuthInboundPortToken) private readonly patchAuthService: PatchAuthInboundPort,
    // @Inject(DeleteAuthInboundPortToken) private readonly deleteAuthService: DeleteAuthInboundPort,
    // @Inject(ListToSelectAuthInboundPortToken) private readonly listToSelectAuthService: ListToSelectAuthInboundPort,
  ) {
    super()
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login a new Auth' })
  @ApiResponse({ status: 201, description: 'The item has been created an token.' })
  async create(@Body() body: LoginAuthDto) {
    return this.createAuthService.execute(body)
  }

  // @Get()
  // @ApiOperation({ summary: 'Find a Auth List' })
  // @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListAuthDto })
  // async find(@Query() query: CriteriaPaginatedRequestDto) {
  //   return this.listAuthService.execute(query)
  // }
  //
  // @Patch(':id')
  // @ApiOperation({ summary: 'Patch a Auth' })
  // @ApiResponse({ status: 200, description: 'The item has been patched.' })
  // async patch(@Param('id') id: string, @Body() body: PatchAuthDto) {
  //   return this.patchAuthService.execute(body, { id })
  // }
  //
  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a Auth' })
  // @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  // async delete(@Param('id') id: string) {
  //   return this.deleteAuthService.execute({ id })
  // }
  //
  // @Get('to/selects')
  // @ApiOperation({ summary: 'List Auth List to select' })
  // @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectAuthDto })
  // async findToSelect(@Query() query: CriteriaFindByRequestDto) {
  //   return this.listToSelectAuthService.execute(query)
  // }
}
