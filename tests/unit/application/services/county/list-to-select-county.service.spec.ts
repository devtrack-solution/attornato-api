import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectCountyService } from '@/application/services/county/list-to-select-county.service'
import { CountyRepositoryOutboundPort, CountyRepositoryOutboundPortSymbol } from '@/domain/county/ports/outbound/county-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CountyTestBuilder } from '@tests/unit/application/services/county/county-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectCountyService', () => {
  let service: ListToSelectCountyService
  let countyRepository: jest.Mocked<CountyRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectCountyService, { provide: CountyRepositoryOutboundPortSymbol, useValue: mock<CountyRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectCountyService>(ListToSelectCountyService)
    countyRepository = module.get(CountyRepositoryOutboundPortSymbol)
  })

  it('should list countys successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const countys = [CountyTestBuilder.getSuccess()]

    countyRepository.findForSelectByCriteria.mockResolvedValue(countys)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(countys[0]))
  })
})
