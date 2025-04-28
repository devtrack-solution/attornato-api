import { Test, TestingModule } from '@nestjs/testing'
import { PatchCountyService } from '@/application/services/process/county/patch-county.service'
import { CountyRepositoryOutboundPort, CountyRepositoryOutboundPortSymbol } from '@/domain/process/county/ports/outbound/county-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CountyTestBuilder } from '@tests/unit/application/services/county/county-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { County } from '@/domain/process/county/business-objects/county.bo'

describe('[APPLICATION] - PatchCountyService', () => {
  let service: PatchCountyService
  let countyRepository: jest.Mocked<CountyRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchCountyService, { provide: CountyRepositoryOutboundPortSymbol, useValue: mock<CountyRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchCountyService>(PatchCountyService)
    countyRepository = module.get(CountyRepositoryOutboundPortSymbol)
  })

  it('should patch a county successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = CountyTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    countyRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(countyRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, County, relations)
  })
})
