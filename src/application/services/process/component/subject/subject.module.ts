import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { DeleteSubjectService } from './delete-subject.service'
import { ListSubjectService } from './list-subject.service'
import { ListToSelectSubjectService } from './list-to-select-subject.service'
import { PatchSubjectService } from './patch-subject.service'
import { CreateSubjectInboundPortToken } from '@/domain/process/component/subject/ports/inbound/create-subject-responsible.inbound-port'
import { CreateSubjectService } from '@/application/services/process/component/subject/crete-subject.service'
import { DeleteSubjectInboundPortToken } from '@/domain/process/component/subject/ports/inbound/delete-subject.inbound-port'
import { ListSubjectInboundPortToken } from '@/domain/process/component/subject/ports/inbound/list-subject.inbound-port'
import { ListToSelectSubjectInboundPortToken } from '@/domain/process/component/subject/ports/inbound/list-to-select-subject.inbound-port'
import { PatchSubjectInboundPortToken } from '@/domain/process/component/subject/ports/inbound/patch-subject.inbound-port'

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: CreateSubjectInboundPortToken,
      useClass: CreateSubjectService,
    },
    {
      provide: DeleteSubjectInboundPortToken,
      useClass: DeleteSubjectService,
    },
    {
      provide: ListSubjectInboundPortToken,
      useClass: ListSubjectService,
    },
    {
      provide: ListToSelectSubjectInboundPortToken,
      useClass: ListToSelectSubjectService,
    },
    {
      provide: PatchSubjectInboundPortToken,
      useClass: PatchSubjectService,
    },
  ],
  exports: [
    {
      provide: CreateSubjectInboundPortToken,
      useClass: CreateSubjectService,
    },
    {
      provide: DeleteSubjectInboundPortToken,
      useClass: DeleteSubjectService,
    },
    {
      provide: ListSubjectInboundPortToken,
      useClass: ListSubjectService,
    },
    {
      provide: ListToSelectSubjectInboundPortToken,
      useClass: ListToSelectSubjectService,
    },
    {
      provide: PatchSubjectInboundPortToken,
      useClass: PatchSubjectService,
    },
  ],
})
export class SubjectModule {}
