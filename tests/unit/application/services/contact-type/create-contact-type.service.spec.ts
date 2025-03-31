import { Test, TestingModule } from '@nestjs/testing'
import { ContactTypeRepositoryOutboundPort, ContactTypeRepositoryOutboundPortSymbol } from '@/domain/contact-type/ports/outbound/contact-type-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateContactTypeService } from '@/application/services/contact-type/create-contact-type.service'
import { ContactTypeTestBuilder } from '@tests/unit/application/services/contact-type/contact-type-test.builder'

describe('[APPLICATION] - CreateContactTypeService', () => {
  let service: CreateContactTypeService
  let contactTypeRepository: jest.Mocked<ContactTypeRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateContactTypeService, { provide: ContactTypeRepositoryOutboundPortSymbol, useValue: mock<ContactTypeRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateContactTypeService>(CreateContactTypeService)
    contactTypeRepository = module.get(ContactTypeRepositoryOutboundPortSymbol)
  })

  it('should create a contactType successfully', async () => {
    const inputData = ContactTypeTestBuilder.getSuccess()

    contactTypeRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(contactTypeRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', ContactTypeTestBuilder.getFailOnEmptyName()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
