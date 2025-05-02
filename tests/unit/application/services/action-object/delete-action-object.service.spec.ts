import { Test, TestingModule } from '@nestjs/testing'
import { DeleteActionObjectService } from '@/application/services/process/component/action-object/delete-action-object.service'
import { ActionObjectRepositoryOutboundPort, ActionObjectRepositoryOutboundPortSymbol } from '@/domain/process/component/action-object/ports/outbound/action-object-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteActionObjectService', () => {
  let service: DeleteActionObjectService
  let actionObjectRepository: jest.Mocked<ActionObjectRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteActionObjectService, { provide: ActionObjectRepositoryOutboundPortSymbol, useValue: mock<ActionObjectRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteActionObjectService>(DeleteActionObjectService)
    actionObjectRepository = module.get(ActionObjectRepositoryOutboundPortSymbol)
  })

  it('should delete a actionObject by ID', async () => {
    const criteria = { id: 'valid-id' }

    actionObjectRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(actionObjectRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if actionObject does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    actionObjectRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
