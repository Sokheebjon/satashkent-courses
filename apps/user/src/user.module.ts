import { Module } from "@nestjs/common";
import { LoggerModule } from "@shared";
import { UserAuthModule } from "./auth/auth.module";
import { ConfigModule } from "@shared/config/config.module";
import { CategoriesModule } from "./categories/categories.module";
import { CoursesModule } from "./courses/courses.module";
import { LessonsModule } from "./lessons/lessons.module";
import { PlaylistsModule } from "./playlists/playlists.module";


@Module({
    imports: [LoggerModule, ConfigModule, UserAuthModule, CategoriesModule, CoursesModule, LessonsModule, PlaylistsModule],
    controllers: [],
    providers: [],
})
export class UserModule {}