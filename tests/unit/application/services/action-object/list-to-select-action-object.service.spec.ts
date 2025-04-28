import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectActionObjectService } from '@/application/services/process/action-object/list-to-select-action-object.service'
import { ActionObjectRepositoryOutboundPort, ActionObjectRepositoryOutboundPortSymbol } from '@/domain/process/action-object/ports/outbound/action-object-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { ActionObjectTestBuilder } from '@tests/unit/application/services/action-object/action-object-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectActionObjectService', () => {
  let service: ListToSelectActionObjectService
  let actionObjectRepository: jest.Mocked<ActionObjectRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectActionObjectService, { provide: ActionObjectRepositoryOutboundPortSymbol, useValue: mock<ActionObjectRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectActionObjectService>(ListToSelectActionObjectService)
    actionObjectRepository = module.get(ActionObjectRepositoryOutboundPortSymbol)
  })

  it('should list actionObjects successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const actionObjects = [ActionObjectTestBuilder.getSuccess()]

    actionObjectRepository.findForSelectByCriteria.mockResolvedValue(actionObjects)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(actionObjects[0]))
  })
})
