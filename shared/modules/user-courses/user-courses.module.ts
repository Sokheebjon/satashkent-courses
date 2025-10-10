import { Module } from "@nestjs/common";
import { UserCoursesService } from "./user-courses.service";
import { UserCoursesRepository } from "./user-courses.repository";

@Module({
    imports: [],
    providers: [UserCoursesService, UserCoursesRepository],
    exports: [UserCoursesService],
})
export class UserCoursesModule {}
