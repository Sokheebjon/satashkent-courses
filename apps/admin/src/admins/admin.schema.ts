import { BaseDocument, Collections } from '@shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';


@Schema({
  versionKey: false,
  collection: Collections.ADMINS,
})
export class AdminDocument extends BaseDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  login: string;

  @Prop({ default: false })
  isDefault?: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: Collections.ROLES })
  roleId?: Types.ObjectId;

  @Prop()
  phone?: string;

  @Prop()
  email?: string;
}

export const AdminSchema = SchemaFactory.createForClass(AdminDocument);

AdminSchema.index(
  {
    login: 1,
  },
  {
    collation: {
      locale: 'en',
      strength: 2,
    },
    unique: true,
    background: true,
    partialFilterExpression: {
      deletedAt: {
        $eq: null,
      },
    },
  },
);