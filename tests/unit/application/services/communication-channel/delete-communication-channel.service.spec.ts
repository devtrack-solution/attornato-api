import { Test, TestingModule } from '@nestjs/testing'
import { DeleteCommunicationChannelService } from '@/application/services/client/component/person/communication-address/contact/communication-channel/delete-communication-channel.service'
import { CommunicationChannelRepositoryOutboundPort, CommunicationChannelRepositoryOutboundPortSymbol } from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/outbound/communication-channel-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteCommunicationChannelService', () => {
  let service: DeleteCommunicationChannelService
  let communicationChannelRepository: jest.Mocked<CommunicationChannelRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteCommunicationChannelService, { provide: CommunicationChannelRepositoryOutboundPortSymbol, useValue: mock<CommunicationChannelRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteCommunicationChannelService>(DeleteCommunicationChannelService)
    communicationChannelRepository = module.get(CommunicationChannelRepositoryOutboundPortSymbol)
  })

  it('should delete a communicationChannel by ID', async () => {
    const criteria = { id: 'valid-id' }

    communicationChannelRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(communicationChannelRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if communicationChannel does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    communicationChannelRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
