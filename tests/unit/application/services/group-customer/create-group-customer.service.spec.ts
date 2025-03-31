import { Test, TestingModule } from '@nestjs/testing'
import { GroupCustomerRepositoryOutboundPort, GroupCustomerRepositoryOutboundPortSymbol } from '@/domain/group-customer/ports/outbound/group-customer-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateGroupCustomerService } from '@/application/services/group-customer/create-group-customer.service'
import { GroupCustomerTestBuilder } from '@tests/unit/application/services/group-customer/group-customer-test.builder'

describe('[APPLICATION] - CreateGroupCustomerService', () => {
  let service: CreateGroupCustomerService
  let groupCustomerRepository: jest.Mocked<GroupCustomerRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateGroupCustomerService, { provide: GroupCustomerRepositoryOutboundPortSymbol, useValue: mock<GroupCustomerRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateGroupCustomerService>(CreateGroupCustomerService)
    groupCustomerRepository = module.get(GroupCustomerRepositoryOutboundPortSymbol)
  })

  it('should create a groupCustomer successfully', async () => {
    const inputData = GroupCustomerTestBuilder.getSuccess()

    groupCustomerRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(groupCustomerRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', GroupCustomerTestBuilder.getFailOnEmptyName()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
