import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseDocument, Collections } from "@shared";
import { Types } from "mongoose";

export enum Level {
    BEGINNER = 'beginner',
    INTERMEDIATE = 'intermediate',
    ADVANCED = 'advanced',
}

@Schema({
    versionKey: false,
    collection: Collections.PLAYLISTS,
})
export class PlaylistDocument extends BaseDocument {
    @Prop({ ref: Collections.COURSES })
    courseId: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    lessonIds: Types.ObjectId[];
}

export const PlaylistSchema = SchemaFactory.createForClass(PlaylistDocument);
