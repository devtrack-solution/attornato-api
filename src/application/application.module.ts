import { Module } from "@nestjs/common";
import { ConfigModule } from "@/infrastructure/config/config.module";
import { TodoModule } from "@/application/domain/todo/todo.module";


@Module(
  {
    imports: [
      TodoModule
    ],
    providers: [],
    exports: []
  }
)
export class ApplicationModule {}