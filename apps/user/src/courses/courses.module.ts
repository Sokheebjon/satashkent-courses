import { Module } from "@nestjs/common";
import { CoursesController } from "./courses.controller";
import { SharedCoursesModule } from "@shared/modules/courses/courses.module";



@Module({
    imports: [SharedCoursesModule],
    controllers: [CoursesController],
    
})
export class CoursesModule {}