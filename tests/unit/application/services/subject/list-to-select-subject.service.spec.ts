import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectFreeFieldService } from '@/application/services/client/component/person/contact-person/free-field/list-to-select-free-field.service'
import { FreeFieldRepositoryOutboundPort, FreeFieldRepositoryOutboundPortSymbol } from '@/domain/client/component/person/contact-person/free-field/ports/outbound/free-field-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { FreeFieldTestBuilder } from '@tests/unit/application/services/free-field/free-field-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectFreeFieldService', () => {
  let service: ListToSelectFreeFieldService
  let freeFieldRepository: jest.Mocked<FreeFieldRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectFreeFieldService, { provide: FreeFieldRepositoryOutboundPortSymbol, useValue: mock<FreeFieldRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectFreeFieldService>(ListToSelectFreeFieldService)
    freeFieldRepository = module.get(FreeFieldRepositoryOutboundPortSymbol)
  })

  it('should list freeFields successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const freeFields = [FreeFieldTestBuilder.getSuccess()]

    freeFieldRepository.findForSelectByCriteria.mockResolvedValue(freeFields)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(freeFields[0]))
  })
})
