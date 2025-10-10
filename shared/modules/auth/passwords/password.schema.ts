import { Types } from 'mongoose';
import { Collections } from '@shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '@shared';

@Schema({
  collection: Collections.PASSWORDS,
})
export class PasswordDocument extends BaseDocument {
  @Prop({ ref: Collections.USERS })
  userId: Types.ObjectId;

  @Prop({ ref: Collections.ADMINS })
  adminId: Types.ObjectId;

  @Prop({ required: true })
  hashPassword: string;
}

export const PasswordSchema = SchemaFactory.createForClass(PasswordDocument);

PasswordSchema.index(
  {
    userId: 1,
    adminId: 1,
  },
  {
    unique: true,
    background: true,
  },
);
