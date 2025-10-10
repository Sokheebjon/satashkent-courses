import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Collections } from "@shared/constants";
import { BaseDocument } from "@shared/database";
import { Types } from "mongoose";
import { LessonDocument } from "../lessons/lessons.schema";

@Schema({
    versionKey: false,
    collection: Collections.USER_COURSES,
})
export class UserCourseLessonsDocument extends BaseDocument {
    @Prop({ref: Collections.USERS})
    userId: Types.ObjectId;

    @Prop({ref: Collections.COURSES}) 
    userCoursePlaylistId: Types.ObjectId;

    @Prop({ ref: Collections.LESSONS })
    lessonId: Types.ObjectId;

    @Prop()
    lessonClone: LessonDocument;
}

export const UserCourseLessonsSchema = SchemaFactory.createForClass(UserCourseLessonsDocument);
