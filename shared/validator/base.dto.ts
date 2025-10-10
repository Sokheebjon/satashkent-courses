import { ParseSelect } from './custom/parseSelect';
import { Types } from 'mongoose';
import { IsMongoIdCustom } from '@shared/validator/mongoId';

export class BaseDto {
  static POST = 'POST';
  static UPDATE = 'UPDATE';
  static LOGIN = 'LOGIN';
  static GET = 'GET';
  static PASSWORD = 'PASSWORD';
  static ACTIVITY = 'ACTIVITY';
}

export class SelectDto {
  @ParseSelect({ groups: [BaseDto.GET] })
  select: any;
}

export class BasePositionDto {
  @IsMongoIdCustom({ each: true })
  ids: Types.ObjectId[];
}
