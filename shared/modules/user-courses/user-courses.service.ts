import { Injectable } from "@nestjs/common";
import { BaseService } from "@shared/database";
import { UserCoursesDocument } from "./user-courses.schema";
import { UserCoursesRepository } from "./user-courses.repository";


@Injectable()
export class UserCoursesService extends BaseService<UserCoursesDocument> {
    constructor(
        protected readonly repository: UserCoursesRepository
    ) {
        super();
    }

}
