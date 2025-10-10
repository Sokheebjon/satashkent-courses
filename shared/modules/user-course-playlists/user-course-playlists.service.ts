import { Injectable } from "@nestjs/common";
import { BaseService } from "@shared/database";
import { UserCoursesPlaylistsDocument } from "./user-course-playlists.schema";
import { UserCoursesPlaylistsRepository } from "./user-course-playlists.repository";


@Injectable()
export class UserCoursesPlaylistsService extends BaseService<UserCoursesPlaylistsDocument> {
    constructor(
        protected readonly repository: UserCoursesPlaylistsRepository
    ) {
        super();
    }

}
