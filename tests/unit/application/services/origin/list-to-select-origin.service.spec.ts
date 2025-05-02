import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectOriginService } from '@/application/services/process/component/origin/list-to-select-origin.service'
import { OriginRepositoryOutboundPort, OriginRepositoryOutboundPortSymbol } from '@/domain/process/component/origin/ports/outbound/origin-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { OriginTestBuilder } from '@tests/unit/application/services/origin/origin-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectOriginService', () => {
  let service: ListToSelectOriginService
  let originRepository: jest.Mocked<OriginRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectOriginService, { provide: OriginRepositoryOutboundPortSymbol, useValue: mock<OriginRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectOriginService>(ListToSelectOriginService)
    originRepository = module.get(OriginRepositoryOutboundPortSymbol)
  })

  it('should list origins successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const origins = [OriginTestBuilder.getSuccess()]

    originRepository.findForSelectByCriteria.mockResolvedValue(origins)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(origins[0]))
  })
})
