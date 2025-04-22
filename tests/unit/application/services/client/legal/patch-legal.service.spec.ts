import { Test, TestingModule } from '@nestjs/testing'
import { PatchLegalService } from '@/application/services/client/legal/patch-legal.service'
import { LegalRepositoryOutboundPort, LegalRepositoryOutboundPortSymbol } from '@/domain/client/legal/ports/outbound/legal-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { LegalTestBuilder } from '@tests/unit/application/services/client/legal/legal-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Legal } from '@/domain/client/legal/business-objects/legal.bo'

describe('[APPLICATION] - PatchLegalService', () => {
  let service: PatchLegalService
  let legalRepository: jest.Mocked<LegalRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchLegalService, { provide: LegalRepositoryOutboundPortSymbol, useValue: mock<LegalRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchLegalService>(PatchLegalService)
    legalRepository = module.get(LegalRepositoryOutboundPortSymbol)
  })

  it('should patch a legal successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = LegalTestBuilder.create().withCnpj('00.000.000/0000-00').build()
    const relations: string[] = []

    legalRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(legalRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, Legal, relations)
  })
})
