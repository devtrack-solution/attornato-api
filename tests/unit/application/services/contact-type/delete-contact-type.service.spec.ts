import { Test, TestingModule } from '@nestjs/testing'
import { DeleteContactTypeService } from '@/application/services/communication-channel/delete-contact-type.service'
import { ContactTypeRepositoryOutboundPort, ContactTypeRepositoryOutboundPortSymbol } from '@/domain/contact-type/ports/outbound/contact-type-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteContactTypeService', () => {
  let service: DeleteContactTypeService
  let contactTypeRepository: jest.Mocked<ContactTypeRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteContactTypeService, { provide: ContactTypeRepositoryOutboundPortSymbol, useValue: mock<ContactTypeRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteContactTypeService>(DeleteContactTypeService)
    contactTypeRepository = module.get(ContactTypeRepositoryOutboundPortSymbol)
  })

  it('should delete a contactType by ID', async () => {
    const criteria = { id: 'valid-id' }

    contactTypeRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(contactTypeRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if contactType does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    contactTypeRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
