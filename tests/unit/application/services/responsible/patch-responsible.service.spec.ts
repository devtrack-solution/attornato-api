import { Test, TestingModule } from '@nestjs/testing'
import { PatchResponsibleService } from '@/application/services/process/component/responsible/patch-responsible.service'
import { ResponsibleRepositoryOutboundPort, ResponsibleRepositoryOutboundPortSymbol } from '@/domain/process/component/responsible/ports/outbound/responsible-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { ResponsibleTestBuilder } from '@tests/unit/application/services/responsible/responsible-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Responsible } from '@/domain/process/component/responsible/business-objects/responsible.bo'

describe('[APPLICATION] - PatchResponsibleService', () => {
  let service: PatchResponsibleService
  let responsibleRepository: jest.Mocked<ResponsibleRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchResponsibleService, { provide: ResponsibleRepositoryOutboundPortSymbol, useValue: mock<ResponsibleRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchResponsibleService>(PatchResponsibleService)
    responsibleRepository = module.get(ResponsibleRepositoryOutboundPortSymbol)
  })

  it('should patch a responsible successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = ResponsibleTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    responsibleRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(responsibleRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, Responsible, relations)
  })
})
