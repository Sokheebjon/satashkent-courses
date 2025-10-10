import { BaseDocument, Collections } from '@shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
  collection: Collections.ROLES,
})
export class RoleDocument extends BaseDocument {
  @Prop()
  name: string;
  @Prop()
  user: boolean;
  @Prop()
  userCreate: boolean;
  @Prop()
  userUpdate: boolean;
  @Prop()
  userDelete: boolean;

  @Prop()
  admin: boolean;
  @Prop()
  adminCreate: boolean;
  @Prop()
  adminUpdate: boolean;
  @Prop()
  adminDelete: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(RoleDocument);
