import { Test, TestingModule } from '@nestjs/testing'
import { PatchOriginService } from '@/application/services/process/origin/patch-origin.service'
import { OriginRepositoryOutboundPort, OriginRepositoryOutboundPortSymbol } from '@/domain/process/origin/ports/outbound/origin-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { OriginTestBuilder } from '@tests/unit/application/services/origin/origin-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Origin } from '@/domain/process/origin/business-objects/origin.bo'

describe('[APPLICATION] - PatchOriginService', () => {
  let service: PatchOriginService
  let originRepository: jest.Mocked<OriginRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchOriginService, { provide: OriginRepositoryOutboundPortSymbol, useValue: mock<OriginRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchOriginService>(PatchOriginService)
    originRepository = module.get(OriginRepositoryOutboundPortSymbol)
  })

  it('should patch a origin successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = OriginTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    originRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(originRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, Origin, relations)
  })
})
