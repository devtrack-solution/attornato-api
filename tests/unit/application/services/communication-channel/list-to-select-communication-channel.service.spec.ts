import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectCommunicationChannelService } from '@/application/services/client/component/person/communication-address/contact/communication-channel/list-to-select-communication-channel.service'
import {
  CommunicationChannelRepositoryOutboundPort,
  CommunicationChannelRepositoryOutboundPortSymbol,
} from '@/domain/client/component/person/communication-address/contact/communication-channel/ports/outbound/communication-channel-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CommunicationChannelTestBuilder } from '@tests/unit/application/services/communication-channel/communication-channel-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectCommunicationChannelService', () => {
  let service: ListToSelectCommunicationChannelService
  let communicationChannelRepository: jest.Mocked<CommunicationChannelRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectCommunicationChannelService, { provide: CommunicationChannelRepositoryOutboundPortSymbol, useValue: mock<CommunicationChannelRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectCommunicationChannelService>(ListToSelectCommunicationChannelService)
    communicationChannelRepository = module.get(CommunicationChannelRepositoryOutboundPortSymbol)
  })

  it('should list communicationChannels successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const communicationChannels = [CommunicationChannelTestBuilder.getSuccess()]

    communicationChannelRepository.findForSelectByCriteria.mockResolvedValue(communicationChannels)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(communicationChannels[0]))
  })
})
