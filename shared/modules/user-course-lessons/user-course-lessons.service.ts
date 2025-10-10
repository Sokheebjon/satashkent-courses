import { Injectable } from "@nestjs/common";
import { BaseService } from "@shared/database";
import { UserCourseLessonsDocument } from "./user-course-lessons.schema";
import { UserCourseLessonsRepository } from "./user-course-lessons.repository";


@Injectable()
export class UserCourseLessonsService extends BaseService<UserCourseLessonsDocument> {
    constructor(
        protected readonly repository: UserCourseLessonsRepository
    ) {
        super();
    }

}
