import { Test, TestingModule } from '@nestjs/testing'
import { PermissionRepositoryOutboundPort, PermissionRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/permission-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreatePermissionService } from '@/application/services/permission/create-permission.service'
import { PermissionTestBuilder } from '@tests/unit/application/services/permission/permission-test.builder'

describe('[APPLICATION] - CreatePermissionService', () => {
  let service: CreatePermissionService
  let permissionRepository: jest.Mocked<PermissionRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePermissionService, { provide: PermissionRepositoryOutboundPortSymbol, useValue: mock<PermissionRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreatePermissionService>(CreatePermissionService)
    permissionRepository = module.get(PermissionRepositoryOutboundPortSymbol)
  })

  it('should create a permission successfully', async () => {
    const inputData = PermissionTestBuilder.getSuccess()

    permissionRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(permissionRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result.description).toEqual(expect.stringContaining(inputData.description))
    expect(result.resource).toEqual(expect.stringContaining(inputData.resource))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', PermissionTestBuilder.getFailOnEmptyName()],
    ['description is empty', PermissionTestBuilder.getFailOnEmptyDescription()],
    ['resource is empty', PermissionTestBuilder.getFailOnEmptyResource()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
