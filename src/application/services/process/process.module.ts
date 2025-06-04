import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { ListToSelectProcessInboundPortToken } from '@/domain/process/ports/inbound/list-to-select-process.inbound-port'
import { ListProcessInboundPortToken } from '@/domain/process/ports/inbound/list-process.inbound-port'
import { ListProcessService } from '@/application/services/process/list-process.service'
import { ListToSelectProcessService } from '@/application/services/process/list-to-select-process.service'

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: ListProcessInboundPortToken,
      useClass: ListProcessService,
    },
    {
      provide: ListToSelectProcessInboundPortToken,
      useClass: ListToSelectProcessService,
    },
  ],
  exports: [
    {
      provide: ListProcessInboundPortToken,
      useClass: ListProcessService,
    },
    {
      provide: ListToSelectProcessInboundPortToken,
      useClass: ListToSelectProcessService,
    },
  ],
})
export class ProcessModule {}
