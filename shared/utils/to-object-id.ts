import { Types } from 'mongoose';

export function toObjectIdUtil(value: string): Types.ObjectId;
export function toObjectIdUtil(value: string[]): Types.ObjectId[];
export function toObjectIdUtil(
  value: string | string[],
): Types.ObjectId | Types.ObjectId[] {
  if (Array.isArray(value))
    return value.map((val) => new Types.ObjectId(val.toString()));
  return new Types.ObjectId(value.toString());
}
