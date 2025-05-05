import { Test, TestingModule } from '@nestjs/testing'
import { PatchGroupCustomerService } from '@/application/services/client/component/group-customer/patch-group-customer.service'
import { GroupCustomerRepositoryOutboundPort, GroupCustomerRepositoryOutboundPortSymbol } from '@/domain/client/component/group-customer/ports/outbound/group-customer-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { GroupCustomerTestBuilder } from '@tests/unit/application/services/group-customer/group-customer-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { GroupCustomer } from '@/domain/client/component/group-customer/business-objects/group-customer.bo'

describe('[APPLICATION] - PatchGroupCustomerService', () => {
  let service: PatchGroupCustomerService
  let groupCustomerRepository: jest.Mocked<GroupCustomerRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchGroupCustomerService, { provide: GroupCustomerRepositoryOutboundPortSymbol, useValue: mock<GroupCustomerRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchGroupCustomerService>(PatchGroupCustomerService)
    groupCustomerRepository = module.get(GroupCustomerRepositoryOutboundPortSymbol)
  })

  it('should patch a groupCustomer successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = GroupCustomerTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    groupCustomerRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(groupCustomerRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, GroupCustomer, relations)
  })
})
