import { Types } from 'mongoose';
import { Collections } from '@shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '@shared';

@Schema({
  collection: Collections.SESSIONS,
})
export class SessionDocument extends BaseDocument {
  @Prop({ ref: Collections.USERS })
  userId: Types.ObjectId;

  @Prop({ ref: Collections.ADMINS })
  adminId: Types.ObjectId;

  @Prop({})
  hashToken: string;

  @Prop({})
  device?: string;

  @Prop()
  ip?: string;

  @Prop({})
  loginAt: Date;

  @Prop({})
  activeAt: Date;

  @Prop({})
  expireAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(SessionDocument);
