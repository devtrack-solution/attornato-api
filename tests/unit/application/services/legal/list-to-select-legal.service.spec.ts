import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectLegalService } from '@/application/services/legal/list-to-select-legal.service'
import { LegalRepositoryOutboundPort, LegalRepositoryOutboundPortSymbol } from '@/domain/legal/ports/outbound/legal-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { LegalTestBuilder } from '@tests/unit/application/services/legal/legal-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Legal } from '@/domain/legal/business-objects/legal.bo'

describe('[APPLICATION] - ListToSelectLegalService', () => {
  let service: ListToSelectLegalService
  let legalRepository: jest.Mocked<LegalRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectLegalService, { provide: LegalRepositoryOutboundPortSymbol, useValue: mock<LegalRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectLegalService>(ListToSelectLegalService)
    legalRepository = module.get(LegalRepositoryOutboundPortSymbol)
  })

  it('should list legals successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }

    const legal = LegalTestBuilder.getSuccess()
    const legalSerialized = new Legal(legal).toPersistenceObject()

    legalRepository.findForSelectByCriteria.mockResolvedValue([legalSerialized])

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(legalSerialized))
  })

})
