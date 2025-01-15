import { Module } from "@nestjs/common";
import { ConfigPortSymbol } from "@/application/domain/ports/config.port";
import { ConfigService } from "@/infrastructure/config/config.service";


@Module({
  imports: [],
  providers: [
    {
      provide: ConfigPortSymbol,
      useClass: ConfigService
    }
  ],
  exports: [
    {
      provide: ConfigPortSymbol,
      useClass: ConfigService
    }
  ],
})
export class ConfigModule {}