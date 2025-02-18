import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectPermissionService } from '@/application/services/permission/list-to-select-permission.service'
import { PermissionRepositoryOutboundPort, PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { PermissionTestBuilder } from '@tests/unit/application/services/permission/permission-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectPermissionService', () => {
  let service: ListToSelectPermissionService
  let permissionRepository: jest.Mocked<PermissionRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectPermissionService, { provide: PermissionRepositoryOutboundPortSymbol, useValue: mock<PermissionRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectPermissionService>(ListToSelectPermissionService)
    permissionRepository = module.get(PermissionRepositoryOutboundPortSymbol)
  })

  it('should list permissions successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const permissions = [PermissionTestBuilder.getSuccess()]

    permissionRepository.findForSelectByCriteria.mockResolvedValue(permissions)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(permissions[0]))
  })
})
