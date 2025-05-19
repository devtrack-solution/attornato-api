import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectLegalService } from '@/application/services/client/legal/list-to-select-legal.service'
import { LegalRepositoryOutboundPort, LegalRepositoryOutboundPortSymbol } from '@/domain/client/component/legal/ports/outbound/legal-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { LegalTestBuilder } from '@tests/unit/application/services/client/legal/legal-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Legal } from '@/domain/client/component/legal/business-objects/legal.bo'
import { v4 as uuidv4 } from 'uuid'

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
    const communicationChannelId = uuidv4()
    const groupCustomerId = uuidv4()
    const profileId = uuidv4()
    const freeFieldId = uuidv4()
    const legal = LegalTestBuilder.getSuccess(communicationChannelId, groupCustomerId, profileId, freeFieldId)
    const legalSerialized = new Legal(legal).toPersistenceObject()

    legalRepository.findForSelectByCriteria.mockResolvedValue([legalSerialized])

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(legalSerialized))
  })
})
