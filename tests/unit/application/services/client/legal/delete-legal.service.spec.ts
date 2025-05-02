import { Test, TestingModule } from '@nestjs/testing'
import { DeleteLegalService } from '@/application/services/client/legal/delete-legal.service'
import { LegalRepositoryOutboundPort, LegalRepositoryOutboundPortSymbol } from '@/domain/client/component/legal/ports/outbound/legal-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteLegalService', () => {
  let service: DeleteLegalService
  let legalRepository: jest.Mocked<LegalRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteLegalService, { provide: LegalRepositoryOutboundPortSymbol, useValue: mock<LegalRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteLegalService>(DeleteLegalService)
    legalRepository = module.get(LegalRepositoryOutboundPortSymbol)
  })

  it('should delete a legal by ID', async () => {
    const criteria = { id: 'valid-id' }

    legalRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(legalRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if legal does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    legalRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
