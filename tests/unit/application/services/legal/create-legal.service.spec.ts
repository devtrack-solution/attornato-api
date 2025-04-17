import { Test, TestingModule } from '@nestjs/testing'
import { CreateLegalService } from '@/application/services/legal/create-legal.service'
import { LegalRepositoryOutboundPort, LegalRepositoryOutboundPortSymbol } from '@/domain/legal/ports/outbound/legal-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { LegalTestBuilder } from './legal-test.builder'
import { Legal } from '@/domain/legal/business-objects/legal.bo'

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

    expect(legalRepository.saveObjectWithRelations).toHaveBeenCalledWith(expect.any(Legal))
  })

})
