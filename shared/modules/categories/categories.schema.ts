import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseDocument, Collections } from "@shared";
import { Types } from "mongoose";

@Schema({
    versionKey: false,
    collection: Collections.CATEGORIES, 
})

export class CategoryDocument extends BaseDocument {
    @Prop()
    name: string;

    @Prop()
    slug: string;

    @Prop()
    description: string;

    @Prop()
    parentId: Types.ObjectId;

    @Prop()
    icon: string;

    @Prop()
    isActive: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryDocument);
