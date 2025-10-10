import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserCoursesDocument } from "./user-courses.schema";
import { Model } from "mongoose";
import { BaseRepository } from "@shared/database";


@Injectable()
export class UserCoursesRepository extends BaseRepository<UserCoursesDocument> {
    constructor(
        @InjectModel(UserCoursesDocument.name) userModel: Model<UserCoursesDocument>,
    ) {
        super(userModel);
    }
}