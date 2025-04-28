import { Test, TestingModule } from '@nestjs/testing'
import { CommunicationChannelRepositoryOutboundPort, CommunicationChannelRepositoryOutboundPortSymbol } from '@/domain/client/person/communication-address/contact/communication-channel/ports/outbound/communication-channel-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateCommunicationChannelService } from '@/application/services/client/person/communication-address/contact/communication-channel/create-communication-channel.service'
import { CommunicationChannelTestBuilder } from '@tests/unit/application/services/communication-channel/communication-channel-test.builder'

describe('[APPLICATION] - CreateCommunicationChannelService', () => {
  let service: CreateCommunicationChannelService
  let communicationChannelRepository: jest.Mocked<CommunicationChannelRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCommunicationChannelService, { provide: CommunicationChannelRepositoryOutboundPortSymbol, useValue: mock<CommunicationChannelRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateCommunicationChannelService>(CreateCommunicationChannelService)
    communicationChannelRepository = module.get(CommunicationChannelRepositoryOutboundPortSymbol)
  })

  it('should create a communicationChannel successfully', async () => {
    const inputData = CommunicationChannelTestBuilder.getSuccess()

    communicationChannelRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(communicationChannelRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name ?? ''))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', CommunicationChannelTestBuilder.getFailOnEmptyName()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
