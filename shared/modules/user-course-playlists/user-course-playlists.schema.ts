import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Collections } from "@shared/constants";
import { BaseDocument } from "@shared/database";
import { Types } from "mongoose";
import { PlaylistDocument } from "../playlists/playlists.schema";

@Schema({
    versionKey: false,
    collection: Collections.USER_COURSES_PLAYLISTS,
})
export class UserCoursesPlaylistsDocument extends BaseDocument {
    @Prop({ref: Collections.USERS})
    userId: Types.ObjectId;

    @Prop({ ref: Collections.USER_COURSES }) 
    userCoursesId: Types.ObjectId;

    @Prop({ ref: Collections.PLAYLISTS })
    playlistId: Types.ObjectId;

    @Prop()
    playlistClone: PlaylistDocument;
}

export const UserCoursesPlaylistsSchema = SchemaFactory.createForClass(UserCoursesPlaylistsDocument);
