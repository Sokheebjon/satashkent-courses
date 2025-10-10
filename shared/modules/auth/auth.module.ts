import { Module } from '@nestjs/common';
import { PasswordService } from './passwords/password.service';
import { SessionService } from './session/session.service';
import { CacheModule } from '../cache/cache.module';
import { DatabaseModule } from '@shared/database';
import { PasswordDocument, PasswordSchema } from './passwords/password.schema';
import { SessionDocument, SessionSchema } from './session/session.schema';
import { PasswordRepository } from './passwords/password.repository';
import { SessionRepository } from './session/session.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    CacheModule,
    DatabaseModule,
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRE') },
        };
      },
    }),
    DatabaseModule.forFeature([
      {
        name: PasswordDocument.name,
        schema: PasswordSchema,
      },
      {
        name: SessionDocument.name,
        schema: SessionSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    PasswordService,
    PasswordRepository,
    SessionService,
    SessionRepository,
    ConfigService,
    AuthService,
  ],
  exports: [
    ConfigService,
    AuthService,
    PasswordService,
    SessionService,
    NestJwtModule,
  ],
})
export class AuthModule {}
