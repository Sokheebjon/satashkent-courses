import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Collections } from "@shared/constants";
import { BaseDocument } from "@shared/database";
import { Types } from "mongoose";
import { CoursesDocument } from "../courses/courses.schema";

@Schema({
    versionKey: false,
    collection: Collections.USER_COURSES,
})
export class UserCoursesDocument extends BaseDocument {
    @Prop({ref: Collections.USERS})
    userId: Types.ObjectId;

    @Prop({ref: Collections.COURSES}) 
    courseId: Types.ObjectId;

    @Prop()
    courseClone: CoursesDocument;
}

export const UserCoursesSchema = SchemaFactory.createForClass(UserCoursesDocument);
