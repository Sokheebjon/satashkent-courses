import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserCoursesPlaylistsDocument } from "./user-course-playlists.schema";
import { Model } from "mongoose";
import { BaseRepository } from "@shared/database";


@Injectable()
export class UserCoursesPlaylistsRepository extends BaseRepository<UserCoursesPlaylistsDocument> {
    constructor(
        @InjectModel(UserCoursesPlaylistsDocument.name) userModel: Model<UserCoursesPlaylistsDocument>,
    ) {
        super(userModel);
    }
}