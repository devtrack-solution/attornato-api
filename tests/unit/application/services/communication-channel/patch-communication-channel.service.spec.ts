import { Test, TestingModule } from '@nestjs/testing'
import { PatchCommunicationChannelService } from '@/application/services/communication-channel/patch-communication-channel.service'
import { CommunicationChannelRepositoryOutboundPort, CommunicationChannelRepositoryOutboundPortSymbol } from '@/domain/communication-channel/ports/outbound/communication-channel-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CommunicationChannelTestBuilder } from '@tests/unit/application/services/communication-channel/communication-channel-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { CommunicationChannel } from '@/domain/communication-channel/business-objects/communication-channel.bo'

describe('[APPLICATION] - PatchCommunicationChannelService', () => {
  let service: PatchCommunicationChannelService
  let communicationChannelRepository: jest.Mocked<CommunicationChannelRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchCommunicationChannelService, { provide: CommunicationChannelRepositoryOutboundPortSymbol, useValue: mock<CommunicationChannelRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchCommunicationChannelService>(PatchCommunicationChannelService)
    communicationChannelRepository = module.get(CommunicationChannelRepositoryOutboundPortSymbol)
  })

  it('should patch a communicationChannel successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = CommunicationChannelTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    communicationChannelRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(communicationChannelRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, CommunicationChannel, relations)
  })
})
