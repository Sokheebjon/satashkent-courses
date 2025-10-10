import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { DatabaseModule } from '@shared';
import { AdminDocument, AdminSchema } from './admin.schema';
import { AuthModule } from 'shared/modules/auth';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: AdminDocument.name,
        schema: AdminSchema,
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
})
export class AdminModule {}
