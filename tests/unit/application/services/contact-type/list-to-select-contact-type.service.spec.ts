import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectContactTypeService } from '@/application/services/contact-type/list-to-select-contact-type.service'
import { ContactTypeRepositoryOutboundPort, ContactTypeRepositoryOutboundPortSymbol } from '@/domain/contact-type/ports/outbound/contact-type-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { ContactTypeTestBuilder } from '@tests/unit/application/services/contact-type/contact-type-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectContactTypeService', () => {
  let service: ListToSelectContactTypeService
  let contactTypeRepository: jest.Mocked<ContactTypeRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectContactTypeService, { provide: ContactTypeRepositoryOutboundPortSymbol, useValue: mock<ContactTypeRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectContactTypeService>(ListToSelectContactTypeService)
    contactTypeRepository = module.get(ContactTypeRepositoryOutboundPortSymbol)
  })

  it('should list contactTypes successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const contactTypes = [ContactTypeTestBuilder.getSuccess()]

    contactTypeRepository.findForSelectByCriteria.mockResolvedValue(contactTypes)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(contactTypes[0]))
  })
})
