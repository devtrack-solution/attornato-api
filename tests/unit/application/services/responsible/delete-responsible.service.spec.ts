import { Test, TestingModule } from '@nestjs/testing'
import { DeleteResponsibleService } from '@/application/services/process/responsible/delete-responsible.service'
import { ResponsibleRepositoryOutboundPort, ResponsibleRepositoryOutboundPortSymbol } from '@/domain/process/responsible/ports/outbound/responsible-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteResponsibleService', () => {
  let service: DeleteResponsibleService
  let responsibleRepository: jest.Mocked<ResponsibleRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteResponsibleService, { provide: ResponsibleRepositoryOutboundPortSymbol, useValue: mock<ResponsibleRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteResponsibleService>(DeleteResponsibleService)
    responsibleRepository = module.get(ResponsibleRepositoryOutboundPortSymbol)
  })

  it('should delete a responsible by ID', async () => {
    const criteria = { id: 'valid-id' }

    responsibleRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(responsibleRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if responsible does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    responsibleRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
