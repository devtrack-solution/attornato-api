import { Test, TestingModule } from '@nestjs/testing'
import { PatchDetailsService } from '@/application/services/details/patch-details.service'
import { DetailsRepositoryOutboundPort, DetailsRepositoryOutboundPortSymbol } from '@/domain/details/ports/outbound/details-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { DetailsTestBuilder } from '@tests/unit/application/services/details/details-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Details } from '@/domain/details/business-objects/details.bo'

describe('[APPLICATION] - PatchDetailsService', () => {
  let service: PatchDetailsService
  let detailsRepository: jest.Mocked<DetailsRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchDetailsService, { provide: DetailsRepositoryOutboundPortSymbol, useValue: mock<DetailsRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchDetailsService>(PatchDetailsService)
    detailsRepository = module.get(DetailsRepositoryOutboundPortSymbol)
  })

  it('should patch a details successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = DetailsTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    detailsRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(detailsRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, Details, relations)
  })
})
