import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectGroupProcessService } from '@/application/services/process/component/group-process/list-to-select-group-process.service'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/process/component/group-process/ports/outbound/group-process-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { GroupProcessTestBuilder } from '@tests/unit/application/services/group-process/group-process-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectGroupProcessService', () => {
  let service: ListToSelectGroupProcessService
  let groupProcessRepository: jest.Mocked<GroupProcessRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectGroupProcessService, { provide: GroupProcessRepositoryOutboundPortSymbol, useValue: mock<GroupProcessRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectGroupProcessService>(ListToSelectGroupProcessService)
    groupProcessRepository = module.get(GroupProcessRepositoryOutboundPortSymbol)
  })

  it('should list groupProcesss successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const groupProcesss = [GroupProcessTestBuilder.getSuccess()]

    groupProcessRepository.findForSelectByCriteria.mockResolvedValue(groupProcesss)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(groupProcesss[0]))
  })
})
