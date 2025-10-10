import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class BaseDocument {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Number, default: null })
  createdBy?: Types.ObjectId;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Number, default: null })
  updatedBy?: Types.ObjectId;

  @Prop({ type: Date || null, default: null })
  deletedAt?: Date | null;

  @Prop({ type: Number, default: null })
  deletedBy?: Types.ObjectId;
}
