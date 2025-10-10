import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseDocument, Collections } from "@shared";
import { Types } from "mongoose";

@Schema({
    versionKey: false,
    collection: Collections.COURSES,    
})

export class CoursesDocument extends BaseDocument {
    @Prop({ ref: Collections.CATEGORIES })
    categoryId: Types.ObjectId;

    @Prop({ ref: Collections.ADMINS })
    instructorId: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    introVideoLink: string;

    @Prop()
    isLocked: boolean;

    @Prop()
    unlockAfterModule: string;

    @Prop()
    duration: string;

    @Prop()
    level: string;
}

export const CoursesSchema = SchemaFactory.createForClass(CoursesDocument);
