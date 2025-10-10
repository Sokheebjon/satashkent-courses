import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared';
import { AuthModule } from 'shared/modules/auth';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserDocument, UserSchema } from './user.schema';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository]
})
export class SharedUserModule {}
