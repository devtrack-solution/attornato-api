import { Test, TestingModule } from '@nestjs/testing'
import { PatchDetailService } from '@/application/services/process/component/detail/patch-detail.service'
import { DetailRepositoryOutboundPort, DetailRepositoryOutboundPortSymbol } from '@/domain/process/component/detail/ports/outbound/detail-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Detail } from '@/domain/process/component/detail/business-objects/detail.bo'
import { DetailTestBuilder } from '@tests/unit/application/services/detail/detail-test.builder'

describe('[APPLICATION] - PatchDetailService', () => {
  let service: PatchDetailService
  let detailRepository: jest.Mocked<DetailRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchDetailService, { provide: DetailRepositoryOutboundPortSymbol, useValue: mock<DetailRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchDetailService>(PatchDetailService)
    detailRepository = module.get(DetailRepositoryOutboundPortSymbol)
  })

  it('should patch a detail successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = DetailTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    detailRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(detailRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, Detail, relations)
  })
})
