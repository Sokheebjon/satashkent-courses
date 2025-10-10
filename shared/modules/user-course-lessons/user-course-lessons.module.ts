import { Module } from "@nestjs/common";
import { UserCourseLessonsService } from "./user-course-lessons.service";
import { UserCourseLessonsRepository } from "./user-course-lessons.repository";

@Module({
    imports: [],
    providers: [UserCourseLessonsService, UserCourseLessonsRepository],
    exports: [UserCourseLessonsService],
})
export class UserCourseLessonsModule {}
