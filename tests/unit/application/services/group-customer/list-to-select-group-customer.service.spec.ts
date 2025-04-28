import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectGroupCustomerService } from '@/application/services/client/group-customer/list-to-select-group-customer.service'
import { GroupCustomerRepositoryOutboundPort, GroupCustomerRepositoryOutboundPortSymbol } from '@/domain/client/group-customer/ports/outbound/group-customer-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { GroupCustomerTestBuilder } from '@tests/unit/application/services/group-customer/group-customer-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectGroupCustomerService', () => {
  let service: ListToSelectGroupCustomerService
  let groupCustomerRepository: jest.Mocked<GroupCustomerRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectGroupCustomerService, { provide: GroupCustomerRepositoryOutboundPortSymbol, useValue: mock<GroupCustomerRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectGroupCustomerService>(ListToSelectGroupCustomerService)
    groupCustomerRepository = module.get(GroupCustomerRepositoryOutboundPortSymbol)
  })

  it('should list groupCustomers successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const groupCustomers = [GroupCustomerTestBuilder.getSuccess()]

    groupCustomerRepository.findForSelectByCriteria.mockResolvedValue(groupCustomers)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(groupCustomers[0]))
  })
})
