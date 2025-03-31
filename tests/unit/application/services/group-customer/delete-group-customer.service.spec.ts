import { Test, TestingModule } from '@nestjs/testing'
import { DeleteGroupCustomerService } from '@/application/services/group-customer/delete-group-customer.service'
import { GroupCustomerRepositoryOutboundPort, GroupCustomerRepositoryOutboundPortSymbol } from '@/domain/group-customer/ports/outbound/group-customer-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteGroupCustomerService', () => {
  let service: DeleteGroupCustomerService
  let groupCustomerRepository: jest.Mocked<GroupCustomerRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteGroupCustomerService, { provide: GroupCustomerRepositoryOutboundPortSymbol, useValue: mock<GroupCustomerRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteGroupCustomerService>(DeleteGroupCustomerService)
    groupCustomerRepository = module.get(GroupCustomerRepositoryOutboundPortSymbol)
  })

  it('should delete a groupCustomer by ID', async () => {
    const criteria = { id: 'valid-id' }

    groupCustomerRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(groupCustomerRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if groupCustomer does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    groupCustomerRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
