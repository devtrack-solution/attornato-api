import { forwardRef, Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { LoadRolesFromCredentialService } from '@/application/services/securities/load-roles-from-credential.service'
import {
  LoadRolesFromCredentialInboundPortToken
} from '@/domain/securities/ports/inbound/load-roles-from-credential.inbound-port'

@Module({
  imports: [forwardRef(() => CoreModule)],
  controllers: [],
  providers: [
    {
      provide: LoadRolesFromCredentialInboundPortToken,
      useClass: LoadRolesFromCredentialService,
    },
  ],
  exports: [
    {
      provide: LoadRolesFromCredentialInboundPortToken,
      useClass: LoadRolesFromCredentialService,
    },
  ],
})
export class SecurityModule {}
