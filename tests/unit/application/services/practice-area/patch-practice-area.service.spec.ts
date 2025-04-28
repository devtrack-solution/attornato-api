import { Test, TestingModule } from '@nestjs/testing'
import { PatchPracticeAreaService } from '@/application/services/process/practice-area/patch-practice-area.service'
import { PracticeAreaRepositoryOutboundPort, PracticeAreaRepositoryOutboundPortSymbol } from '@/domain/process/practice-area/ports/outbound/practice-area-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { PracticeAreaTestBuilder } from '@tests/unit/application/services/practice-area/practice-area-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PracticeArea } from '@/domain/process/practice-area/business-objects/practice-area.bo'

describe('[APPLICATION] - PatchPracticeAreaService', () => {
  let service: PatchPracticeAreaService
  let practiceAreaRepository: jest.Mocked<PracticeAreaRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchPracticeAreaService, { provide: PracticeAreaRepositoryOutboundPortSymbol, useValue: mock<PracticeAreaRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchPracticeAreaService>(PatchPracticeAreaService)
    practiceAreaRepository = module.get(PracticeAreaRepositoryOutboundPortSymbol)
  })

  it('should patch a practiceArea successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = PracticeAreaTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    practiceAreaRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(practiceAreaRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, PracticeArea, relations)
  })
})
