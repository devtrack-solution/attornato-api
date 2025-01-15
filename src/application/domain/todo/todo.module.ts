import { Module } from "@nestjs/common";
import { ConfigModule } from "@/infrastructure/config/config.module";
import { AdapterModule } from "@/infrastructure/adapters/adapter.module";


@Module(
  {
    imports: [ConfigModule, AdapterModule],
    providers: [],
    exports: []
  }
)
export class TodoModule {}