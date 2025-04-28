import { Test, TestingModule } from '@nestjs/testing'
import { DeleteFreeFieldService } from '@/application/services/client/person/contact-person/free-field/delete-free-field.service'
import { FreeFieldRepositoryOutboundPort, FreeFieldRepositoryOutboundPortSymbol } from '@/domain/client/person/contact-person/free-field/ports/outbound/free-field-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteFreeFieldService', () => {
  let service: DeleteFreeFieldService
  let freeFieldRepository: jest.Mocked<FreeFieldRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteFreeFieldService, { provide: FreeFieldRepositoryOutboundPortSymbol, useValue: mock<FreeFieldRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteFreeFieldService>(DeleteFreeFieldService)
    freeFieldRepository = module.get(FreeFieldRepositoryOutboundPortSymbol)
  })

  it('should delete a freeField by ID', async () => {
    const criteria = { id: 'valid-id' }

    freeFieldRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(freeFieldRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if freeField does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    freeFieldRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
