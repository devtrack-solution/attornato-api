import { Module } from "@nestjs/common";
import { DistributedCachePortSymbol } from "@/application/domain/ports/distributed-cache.port";
import { RedisCacheAdapter } from "@/infrastructure/adapters/redis/redis-cache.adapter";

@Module(
  {
    imports: [],
    providers: [
      {
        provide: DistributedCachePortSymbol,
        useClass: RedisCacheAdapter
      }
    ],
    exports: [
      {
        provide: DistributedCachePortSymbol,
        useClass: RedisCacheAdapter
      }
    ]
  }
)
export class AdapterModule {}