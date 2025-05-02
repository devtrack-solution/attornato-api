import { Test, TestingModule } from '@nestjs/testing'
import { PatchPrognosisService } from '@/application/services/process/component/prognosis/patch-prognosis.service'
import { PrognosisRepositoryOutboundPort, PrognosisRepositoryOutboundPortSymbol } from '@/domain/process/component/prognosis/ports/outbound/prognosis-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { PrognosisTestBuilder } from '@tests/unit/application/services/prognosis/prognosis-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Prognosis } from '@/domain/process/component/prognosis/business-objects/prognosis.bo'

describe('[APPLICATION] - PatchPrognosisService', () => {
  let service: PatchPrognosisService
  let prognosisRepository: jest.Mocked<PrognosisRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchPrognosisService, { provide: PrognosisRepositoryOutboundPortSymbol, useValue: mock<PrognosisRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchPrognosisService>(PatchPrognosisService)
    prognosisRepository = module.get(PrognosisRepositoryOutboundPortSymbol)
  })

  it('should patch a prognosis successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = PrognosisTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    prognosisRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(prognosisRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, Prognosis, relations)
  })
})
