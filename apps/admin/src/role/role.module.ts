import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { DatabaseModule } from '@shared';
import { RoleDocument, RoleSchema } from './role.schema';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role.guard';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: RoleDocument.name,
        schema: RoleSchema,
      },
    ]),
  ],
  controllers: [RoleController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    RoleService,
    RoleRepository,
  ],
})
export class RoleModule {}
