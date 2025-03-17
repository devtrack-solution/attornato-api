import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectGroupProcessService } from '@/application/services/group-process/list-to-select-group-process.service'
import { mock } from 'jest-mock-extended'
import { GroupProcessTestBuilder } from '@tests/unit/application/services/group-process/group-process-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/group-process/ports/outbound/group-process-repository.outbound-port'

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

  it('should list machines successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'Laser Cutter' }
    const machines = [GroupProcessTestBuilder.getSuccess()]

    groupProcessRepository.findForSelectByCriteria.mockResolvedValue(machines)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    // expect(result[0].name).toEqual(machines[0].name)
  })
})
