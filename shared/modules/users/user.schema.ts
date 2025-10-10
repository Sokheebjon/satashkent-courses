import { BaseDocument, Collections } from '@shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
  collection: Collections.USERS,
})
export class UserDocument extends BaseDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  login: string;

  @Prop({ default: false })
  isDefault?: boolean;

  @Prop()
  phone?: string;

  @Prop()
  email?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);

UserSchema.index(
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