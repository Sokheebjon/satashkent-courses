import { Module } from '@nestjs/common';
import { AdminModule  } from './admins/admin.module';
import { ConfigModule } from '@shared/config/config.module';
import { AdminAuthModule } from './auth/auth.module';
import { LoggerModule } from "@shared"
import { CategoriesModule } from './categories/categories.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { UsersModule } from './users/user.module';
@Module({
  imports: [LoggerModule, ConfigModule, AdminAuthModule, AdminModule,   CategoriesModule, CoursesModule, LessonsModule, PlaylistsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AdminAppModule {}