import { Test, TestingModule } from '@nestjs/testing'
import { PatchPermissionService } from '@/application/services/permission/patch-permission.service'
import { PermissionRepositoryOutboundPort, PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { PermissionTestBuilder } from '@tests/unit/application/services/permission/permission-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Permission } from '@/domain/securities/business-objects/permission.bo'

describe('[APPLICATION] - PatchPermissionService', () => {
  let service: PatchPermissionService
  let permissionRepository: jest.Mocked<PermissionRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchPermissionService, { provide: PermissionRepositoryOutboundPortSymbol, useValue: mock<PermissionRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchPermissionService>(PatchPermissionService)
    permissionRepository = module.get(PermissionRepositoryOutboundPortSymbol)
  })

  it('should patch a permission successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = PermissionTestBuilder.create().withName('UPDATED_NAME').build()

    permissionRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(permissionRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, Permission)
  })
})
