import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectResponsibleService } from '@/application/services/process/responsible/list-to-select-responsible.service'
import { ResponsibleRepositoryOutboundPort, ResponsibleRepositoryOutboundPortSymbol } from '@/domain/process/responsible/ports/outbound/responsible-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { ResponsibleTestBuilder } from '@tests/unit/application/services/responsible/responsible-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectResponsibleService', () => {
  let service: ListToSelectResponsibleService
  let responsibleRepository: jest.Mocked<ResponsibleRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectResponsibleService, { provide: ResponsibleRepositoryOutboundPortSymbol, useValue: mock<ResponsibleRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectResponsibleService>(ListToSelectResponsibleService)
    responsibleRepository = module.get(ResponsibleRepositoryOutboundPortSymbol)
  })

  it('should list responsibles successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const responsibles = [ResponsibleTestBuilder.getSuccess()]

    responsibleRepository.findForSelectByCriteria.mockResolvedValue(responsibles)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(responsibles[0]))
  })
})
