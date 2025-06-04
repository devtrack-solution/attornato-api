import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { CreateIndividualInboundPortToken } from '@/domain/client/component/individual/ports/inbound/create-individual.inbound-port'
import { DeleteIndividualInboundPortToken } from '@/domain/client/component/individual/ports/inbound/delete-individual.inbound-port'
import { ListIndividualInboundPortToken } from '@/domain/client/component/individual/ports/inbound/list-individual.inbound-port'
import { ListToSelectIndividualInboundPortToken } from '@/domain/client/component/individual/ports/inbound/list-to-select-individual.inbound-port'
import { PatchIndividualInboundPortToken } from '@/domain/client/component/individual/ports/inbound/patch-individual.inbound-port'
import { CreateIndividualService } from './create-individual.service'
import { DeleteIndividualService } from './delete-individual.service'
import { ListIndividualService } from './list-individual.service'
import { ListToSelectIndividualService } from './list-to-select-individual.service'
import { PatchIndividualService } from './patch-individual.service'

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: CreateIndividualInboundPortToken,
      useClass: CreateIndividualService,
    },
    {
      provide: DeleteIndividualInboundPortToken,
      useClass: DeleteIndividualService,
    },
    {
      provide: ListIndividualInboundPortToken,
      useClass: ListIndividualService,
    },
    {
      provide: ListToSelectIndividualInboundPortToken,
      useClass: ListToSelectIndividualService,
    },
    {
      provide: PatchIndividualInboundPortToken,
      useClass: PatchIndividualService,
    },
  ],
  exports: [
    {
      provide: CreateIndividualInboundPortToken,
      useClass: CreateIndividualService,
    },
    {
      provide: DeleteIndividualInboundPortToken,
      useClass: DeleteIndividualService,
    },
    {
      provide: ListIndividualInboundPortToken,
      useClass: ListIndividualService,
    },
    {
      provide: ListToSelectIndividualInboundPortToken,
      useClass: ListToSelectIndividualService,
    },
    {
      provide: PatchIndividualInboundPortToken,
      useClass: PatchIndividualService,
    },
  ],
})
export class IndividualModule {}
