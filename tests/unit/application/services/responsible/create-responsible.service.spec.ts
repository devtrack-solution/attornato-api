import { Test, TestingModule } from '@nestjs/testing'
import { ResponsibleRepositoryOutboundPort, ResponsibleRepositoryOutboundPortSymbol } from '@/domain/process/component/responsible/ports/outbound/responsible-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateResponsibleService } from '@/application/services/process/component/responsible/create-responsible.service'
import { ResponsibleTestBuilder } from '@tests/unit/application/services/responsible/responsible-test.builder'

describe('[APPLICATION] - CreateResponsibleService', () => {
  let service: CreateResponsibleService
  let responsibleRepository: jest.Mocked<ResponsibleRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateResponsibleService, { provide: ResponsibleRepositoryOutboundPortSymbol, useValue: mock<ResponsibleRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateResponsibleService>(CreateResponsibleService)
    responsibleRepository = module.get(ResponsibleRepositoryOutboundPortSymbol)
  })

  it('should create a responsible successfully', async () => {
    const inputData = ResponsibleTestBuilder.getSuccess()

    responsibleRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(responsibleRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([['name is empty', ResponsibleTestBuilder.getFailOnEmptyName()]])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
