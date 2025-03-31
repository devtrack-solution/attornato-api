import { Test, TestingModule } from '@nestjs/testing'
import { PatchContactTypeService } from '@/application/services/contact-type/patch-contact-type.service'
import { ContactTypeRepositoryOutboundPort, ContactTypeRepositoryOutboundPortSymbol } from '@/domain/contact-type/ports/outbound/contact-type-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { ContactTypeTestBuilder } from '@tests/unit/application/services/contact-type/contact-type-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ContactType } from '@/domain/contact-type/business-objects/contact-type.bo'

describe('[APPLICATION] - PatchContactTypeService', () => {
  let service: PatchContactTypeService
  let contactTypeRepository: jest.Mocked<ContactTypeRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchContactTypeService, { provide: ContactTypeRepositoryOutboundPortSymbol, useValue: mock<ContactTypeRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchContactTypeService>(PatchContactTypeService)
    contactTypeRepository = module.get(ContactTypeRepositoryOutboundPortSymbol)
  })

  it('should patch a contactType successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = ContactTypeTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    contactTypeRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(contactTypeRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, ContactType, relations)
  })
})
