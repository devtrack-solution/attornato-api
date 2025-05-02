import { Test, TestingModule } from '@nestjs/testing'
import { CreateLegalService } from '@/application/services/client/legal/create-legal.service'
import { LegalRepositoryOutboundPort, LegalRepositoryOutboundPortSymbol } from '@/domain/client/component/legal/ports/outbound/legal-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { LegalTestBuilder } from './legal-test.builder'
import { Legal } from '@/domain/client/component/legal/business-objects/legal.bo'

describe('[APPLICATION] - CreateLegalService', () => {
  let service: CreateLegalService
  let legalRepository: jest.Mocked<LegalRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateLegalService,
        {
          provide: LegalRepositoryOutboundPortSymbol,
          useValue: mock<LegalRepositoryOutboundPort>(),
        },
      ],
    }).compile()

    service = module.get<CreateLegalService>(CreateLegalService)
    legalRepository = module.get(LegalRepositoryOutboundPortSymbol)
  })

  it('should create a new Legal successfully', async () => {
    const input = LegalTestBuilder.create().build()

    legalRepository.saveObjectWithRelations.mockResolvedValue(undefined)

    await service.execute(input)

    expect(legalRepository.saveObjectWithRelations).toHaveBeenCalled()

    const savedLegal = legalRepository.saveObjectWithRelations.mock.calls[0][0] as Legal

    expect(savedLegal.companyName).toBe(input.companyName)
    expect(savedLegal.tradeName).toBe(input.tradeName)
    expect(savedLegal.businessArea).toBe(input.businessArea)
    expect(savedLegal.cnpj).toBe(input.cnpj)
    expect(savedLegal.stateRegistration).toBe(input.stateRegistration)
    expect(savedLegal.municipalRegistration).toBe(input.municipalRegistration)
    expect(savedLegal.responsible).toBe(input.responsible)

    // Validando estruturas internas
    expect(savedLegal.person.clientId).toBe(input.person.clientId)
    expect(savedLegal.person.communicationAddress.city).toBe(input.person.communicationAddress.city)
    expect(savedLegal.person.contactPerson.note).toBe(input.person.contactPerson.note)

    expect(savedLegal.profile.name).toBe(input.profile.name)
    expect(savedLegal.groupCustomer.name).toBe(input.groupCustomer.name)
  })
})
