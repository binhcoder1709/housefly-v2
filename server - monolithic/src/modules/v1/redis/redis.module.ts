import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import Redis from 'ioredis';
import { RedisController } from './redis.controller';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: 'localhost', // Hoặc địa chỉ Redis server của bạn
          port: 6379,        // Port Redis server
          // Thêm các cấu hình khác nếu cần
        });
      },
    },
    RedisService,
  ],
  controllers: [RedisController],
  exports: [RedisService, 'REDIS_CLIENT']
})
export class RedisModule {}
