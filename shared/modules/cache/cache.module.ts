import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NestCacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          url: configService.getOrThrow('REDIS_URL'),
        });

        return {
          store,
          ttl: configService.getOrThrow('REDIS_TTL'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class CacheModule {}