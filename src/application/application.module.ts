<<<<<<< Updated upstream
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
=======
import { Module } from '@nestjs/common'
import { CreateTodoService } from '@/application/services/todo/create-todo.service'

@Module({
  providers: [CreateTodoService],
  exports: [CreateTodoService],
})
export class ApplicationModule {}
>>>>>>> Stashed changes
