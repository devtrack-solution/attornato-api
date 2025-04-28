import { Test, TestingModule } from '@nestjs/testing'
import { PatchActionObjectService } from '@/application/services/process/action-object/patch-action-object.service'
import { ActionObjectRepositoryOutboundPort, ActionObjectRepositoryOutboundPortSymbol } from '@/domain/process/action-object/ports/outbound/action-object-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { ActionObjectTestBuilder } from '@tests/unit/application/services/action-object/action-object-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ActionObject } from '@/domain/process/action-object/business-objects/action-object.bo'

describe('[APPLICATION] - PatchActionObjectService', () => {
  let service: PatchActionObjectService
  let actionObjectRepository: jest.Mocked<ActionObjectRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchActionObjectService, { provide: ActionObjectRepositoryOutboundPortSymbol, useValue: mock<ActionObjectRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchActionObjectService>(PatchActionObjectService)
    actionObjectRepository = module.get(ActionObjectRepositoryOutboundPortSymbol)
  })

  it('should patch a actionObject successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = ActionObjectTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    actionObjectRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(actionObjectRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, ActionObject, relations)
  })
})
