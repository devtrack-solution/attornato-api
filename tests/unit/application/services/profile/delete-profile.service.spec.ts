import { Test, TestingModule } from '@nestjs/testing'
import { DeleteProfileService } from '@/application/services/client/profile/delete-profile.service'
import { ProfileRepositoryOutboundPort, ProfileRepositoryOutboundPortSymbol } from '@/domain/client/profile/ports/outbound/profile-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteProfileService', () => {
  let service: DeleteProfileService
  let profileRepository: jest.Mocked<ProfileRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteProfileService, { provide: ProfileRepositoryOutboundPortSymbol, useValue: mock<ProfileRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteProfileService>(DeleteProfileService)
    profileRepository = module.get(ProfileRepositoryOutboundPortSymbol)
  })

  it('should delete a profile by ID', async () => {
    const criteria = { id: 'valid-id' }

    profileRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(profileRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if profile does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    profileRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
