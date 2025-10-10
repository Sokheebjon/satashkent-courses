import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseDocument, Collections } from "@shared";
import { Types } from "mongoose";

@Schema({
    versionKey: false,
    collection: Collections.LESSONS
})

export class LessonDocument extends BaseDocument {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({ ref: Collections.PLAYLISTS })
    playlistId: Types.ObjectId;
}

export const LessonSchema = SchemaFactory.createForClass(LessonDocument);
