import { Test, TestingModule } from '@nestjs/testing'
import { DeletePermissionService } from '@/application/services/permission/delete-permission.service'
import { PermissionRepositoryOutboundPort, PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeletePermissionService', () => {
  let service: DeletePermissionService
  let permissionRepository: jest.Mocked<PermissionRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeletePermissionService, { provide: PermissionRepositoryOutboundPortSymbol, useValue: mock<PermissionRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeletePermissionService>(DeletePermissionService)
    permissionRepository = module.get(PermissionRepositoryOutboundPortSymbol)
  })

  it('should delete a permission by ID', async () => {
    const criteria = { id: 'valid-id' }

    permissionRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(permissionRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if permission does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    permissionRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
