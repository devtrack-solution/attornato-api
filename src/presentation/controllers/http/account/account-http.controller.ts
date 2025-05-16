import { Controller, Inject, Get, Query, UseGuards, Body, Post, Patch, Param, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { BaseHttpController } from '@/presentation/controllers/http/base-http-controller'
import { CriteriaPaginatedRequestDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CriteriaFindByRequestDto } from '@/presentation/controllers/http/dtos/criteria-find-by.dto'
import { ListAccountInboundPort, ListAccountInboundPortToken } from '@/domain/account/ports/inbound/list-account.inbound-port'
import { ListToSelectAccountInboundPort, ListToSelectAccountInboundPortToken } from '@/domain/account/ports/inbound/list-to-select-account.inbound-port'
import { RolesGuard } from '@/commons/guard/roles.guard'
import { Roles } from '@/commons/guard/roles'
import { Permissions } from '@/commons/guard/permissions.decorator'
import { CreateAccountInboundPort, CreateAccountInboundPortToken } from '@/domain/account/ports/inbound/create-account.inbound-port'
import { DeleteAccountInboundPort, DeleteAccountInboundPortToken } from '@/domain/account/ports/inbound/delete-account.inbound-port'
import { ListAccountDto } from '@/presentation/controllers/http/account/dtos/list-account.dto'
import { CreateAccountDto } from '@/presentation/controllers/http/account/dtos/create-account.dto'
import { ListToSelectAccountDto } from '@/presentation/controllers/http/account/dtos/list-to-select-account.dto'

@ApiTags('Accounts')
@Controller('accounts')
export class AccountHttpController extends BaseHttpController {
  constructor(
    @Inject(CreateAccountInboundPortToken) private readonly createAccountService: CreateAccountInboundPort,
    @Inject(ListAccountInboundPortToken) private readonly listAccountService: ListAccountInboundPort,
    @Inject(DeleteAccountInboundPortToken) private readonly deleteAccountService: DeleteAccountInboundPort,
    @Inject(ListToSelectAccountInboundPortToken) private readonly listToSelectAccountService: ListToSelectAccountInboundPort,
  ) {
    super()
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Create a new Account' })
  @ApiResponse({ status: 201, description: 'The item has been created.' })
  async create(@Body() body: CreateAccountDto) {
    return this.createAccountService.execute(body)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Find a Account List' })
  @ApiResponse({ status: 200, description: 'The item has been listed.', type: ListAccountDto })
  async find(@Query() query: CriteriaPaginatedRequestDto) {
    return this.listAccountService.execute(query)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'Delete a Account' })
  @ApiResponse({ status: 200, description: 'The item has been deleted.' })
  async delete(@Param('id') id: string) {
    return this.deleteAccountService.execute({ id })
  }

  @Get('to/selects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Permissions(Roles.ADMINISTRATOR)
  @ApiOperation({ summary: 'List Account List to select' })
  @ApiResponse({ status: 200, description: 'The item has been listed to select.', type: ListToSelectAccountDto })
  async findToSelect(@Query() query: CriteriaFindByRequestDto) {
    return this.listToSelectAccountService.execute(query)
  }
}
