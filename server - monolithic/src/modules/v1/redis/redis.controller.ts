import { Controller, Delete, Get, Param } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('/v1/cache')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('/get/:key')
  async getCacheController(@Param('key') key: string) {
    return await this.redisService.get(key);
  }

  @Delete('/delete/:key')
  async delCacheController(@Param('key') key: string) {
    return await this.redisService.del(key);
  }
}
