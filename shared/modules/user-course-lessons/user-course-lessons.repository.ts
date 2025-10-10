import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserCourseLessonsDocument } from "./user-course-lessons.schema";
import { Model } from "mongoose";
import { BaseRepository } from "@shared/database";


@Injectable()
export class UserCourseLessonsRepository extends BaseRepository<UserCourseLessonsDocument> {
    constructor(
        @InjectModel(UserCourseLessonsDocument.name) userModel: Model<UserCourseLessonsDocument>,
    ) {
        super(userModel);
    }
}