import { Module } from "@nestjs/common";
import { LessonsController } from "./lessons.controller";
import { SharedLessonsModule } from "@shared/modules/lessons/lessons.module";



@Module({
    imports: [SharedLessonsModule],
    controllers: [LessonsController],
    
})
export class LessonsModule {}