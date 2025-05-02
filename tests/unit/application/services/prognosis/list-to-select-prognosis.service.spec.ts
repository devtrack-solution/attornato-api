import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectPrognosisService } from '@/application/services/process/component/prognosis/list-to-select-prognosis.service'
import { PrognosisRepositoryOutboundPort, PrognosisRepositoryOutboundPortSymbol } from '@/domain/process/component/prognosis/ports/outbound/prognosis-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { PrognosisTestBuilder } from '@tests/unit/application/services/prognosis/prognosis-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectPrognosisService', () => {
  let service: ListToSelectPrognosisService
  let prognosisRepository: jest.Mocked<PrognosisRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectPrognosisService, { provide: PrognosisRepositoryOutboundPortSymbol, useValue: mock<PrognosisRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectPrognosisService>(ListToSelectPrognosisService)
    prognosisRepository = module.get(PrognosisRepositoryOutboundPortSymbol)
  })

  it('should list prognosiss successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const prognosiss = [PrognosisTestBuilder.getSuccess()]

    prognosisRepository.findForSelectByCriteria.mockResolvedValue(prognosiss)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(prognosiss[0]))
  })
})
