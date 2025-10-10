import { Module } from "@nestjs/common";
import { UserCoursesPlaylistsService } from "./user-course-playlists.service";
import { UserCoursesPlaylistsRepository } from "./user-course-playlists.repository";

@Module({
    imports: [],
    providers: [UserCoursesPlaylistsService, UserCoursesPlaylistsRepository],
    exports: [UserCoursesPlaylistsService],
})
export class UserCoursesPlaylistsModule {}
