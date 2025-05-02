import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectDetailService } from '@/application/services/process/component/detail/list-to-select-detail.service'
import { DetailRepositoryOutboundPort, DetailRepositoryOutboundPortSymbol } from '@/domain/process/component/detail/ports/outbound/detail-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { DetailTestBuilder } from '@tests/unit/application/services/detail/detail-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectDetailService', () => {
  let service: ListToSelectDetailService
  let detailRepository: jest.Mocked<DetailRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectDetailService, { provide: DetailRepositoryOutboundPortSymbol, useValue: mock<DetailRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectDetailService>(ListToSelectDetailService)
    detailRepository = module.get(DetailRepositoryOutboundPortSymbol)
  })

  it('should list details successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const details = [DetailTestBuilder.getSuccess()]

    detailRepository.findForSelectByCriteria.mockResolvedValue(details)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(details[0]))
  })
})
