import { BaseRepository } from '@shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository extends BaseRepository<
  UserDocument,
  CreateUserDto,
  UpdateUserDto
> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(UserDocument.name) userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
