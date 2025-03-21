import { Inject, Injectable } from '@nestjs/common'
import { CreateGroupProcessInboundPort } from '@/domain/group-process/ports/inbound/create-group-process.inbound-port'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/group-process/ports/outbound/group-process-repository.outbound-port'
import { GroupProcessType } from '@/domain/group-process/types/group-process.type'
import { GroupProcess } from '@/domain/group-process/business-objects/group-process.bo'

@Injectable()
export class CreateGroupProcessService implements CreateGroupProcessInboundPort {
  constructor(
    @Inject(GroupProcessRepositoryOutboundPortSymbol)
    private readonly groupProcessRepository: GroupProcessRepositoryOutboundPort,
  ) {}

  async execute(data: GroupProcessType.Input): Promise<GroupProcessType.Output> {
    let  groupProcess  = new GroupProcess(data)
    await this.groupProcessRepository.saveObject( groupProcess .toPersistence())
    return  groupProcess .toJson()
  }
}
