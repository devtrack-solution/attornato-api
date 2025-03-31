import { Test, TestingModule } from '@nestjs/testing'
import { PatchFreeFieldService } from '@/application/services/free-field/patch-free-field.service'
import { FreeFieldRepositoryOutboundPort, FreeFieldRepositoryOutboundPortSymbol } from '@/domain/free-field/ports/outbound/free-field-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { FreeFieldTestBuilder } from '@tests/unit/application/services/free-field/free-field-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeField } from '@/domain/free-field/business-objects/free-field.bo'

describe('[APPLICATION] - PatchFreeFieldService', () => {
  let service: PatchFreeFieldService
  let freeFieldRepository: jest.Mocked<FreeFieldRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchFreeFieldService, { provide: FreeFieldRepositoryOutboundPortSymbol, useValue: mock<FreeFieldRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchFreeFieldService>(PatchFreeFieldService)
    freeFieldRepository = module.get(FreeFieldRepositoryOutboundPortSymbol)
  })

  it('should patch a freeField successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = FreeFieldTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    freeFieldRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(freeFieldRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, FreeField, relations)
  })
})
