import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectDetailsService } from '@/application/services/process/details/list-to-select-details.service'
import { DetailsRepositoryOutboundPort, DetailsRepositoryOutboundPortSymbol } from '@/domain/process/details/ports/outbound/details-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { DetailsTestBuilder } from '@tests/unit/application/services/details/details-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectDetailsService', () => {
  let service: ListToSelectDetailsService
  let detailsRepository: jest.Mocked<DetailsRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectDetailsService, { provide: DetailsRepositoryOutboundPortSymbol, useValue: mock<DetailsRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectDetailsService>(ListToSelectDetailsService)
    detailsRepository = module.get(DetailsRepositoryOutboundPortSymbol)
  })

  it('should list detailss successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const detailss = [DetailsTestBuilder.getSuccess()]

    detailsRepository.findForSelectByCriteria.mockResolvedValue(detailss)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(detailss[0]))
  })
})
