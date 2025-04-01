import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectPracticeAreaService } from '@/application/services/practice-area/list-to-select-practice-area.service'
import { PracticeAreaRepositoryOutboundPort, PracticeAreaRepositoryOutboundPortSymbol } from '@/domain/practice-area/ports/outbound/practice-area-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { PracticeAreaTestBuilder } from '@tests/unit/application/services/practice-area/practice-area-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectPracticeAreaService', () => {
  let service: ListToSelectPracticeAreaService
  let practiceAreaRepository: jest.Mocked<PracticeAreaRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectPracticeAreaService, { provide: PracticeAreaRepositoryOutboundPortSymbol, useValue: mock<PracticeAreaRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectPracticeAreaService>(ListToSelectPracticeAreaService)
    practiceAreaRepository = module.get(PracticeAreaRepositoryOutboundPortSymbol)
  })

  it('should list practiceAreas successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const practiceAreas = [PracticeAreaTestBuilder.getSuccess()]

    practiceAreaRepository.findForSelectByCriteria.mockResolvedValue(practiceAreas)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(practiceAreas[0]))
  })
})
